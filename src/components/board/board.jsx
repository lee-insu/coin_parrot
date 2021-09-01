import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firestore } from '../../service/firebase';
import style from './board.module.css';
import BoardSearch from './board_search/board_search';

const Board = ({login}) => {


    const [board,getBoard] = useState([]);
    const [lastDoc,setLastDoc] = useState();
    const [loading,setLoading] = useState(false);
    const [isEmpty,setIsEmpty] = useState(false);
    const history = useHistory();


    const boardWrite = () => {
        if(login) {
            history.push('/board/write');
        }else{
            alert('로그인이 필요합니다');
            history.push('/signin');
        }
    }

    const store = firestore.collection("board").orderBy('time','desc');
 

    const onSnapshotState = snapshot => {
        const isCollectionEmpty = snapshot.size === 0;

            if(!isCollectionEmpty) {
                const array = snapshot.docs.map(doc => ({
                    id:doc.id,
                    time:new Date(),
                    ...doc.data()
                }))
                const lastDoc = snapshot.docs[snapshot.docs.length-1];
                getBoard(board => [...board,...array]);
                setLastDoc(lastDoc);
                setLoading(false);
            }else{
                setLoading(false);
                setIsEmpty(true);
            }
    }

    const fetchMore = () => {
        setLoading(true);
        store.startAfter(lastDoc).limit(15)
        .onSnapshot(snapshot =>{
            onSnapshotState(snapshot);
        })
    };


    useEffect(()=> {
        store.limit(15)
        .onSnapshot(snapshot => {
           onSnapshotState(snapshot);
        })
    },[])


    const boards = board.map(bd => 
        <Link to={`/board/${bd.id}`}>
        <li className={style.li} key={bd.id}>
            <div className={style.title}>{bd.title}</div>
             <div className={style.user_info}>
                <div>{bd.name} {bd.month}-{bd.date}</div>
                <div>조회:{bd.views}</div>

            </div>
         </li>
       </Link>
    )

    
    return (
        <div className={style.session}>
        <div className={style.ad}>ad</div>
        <ul>{boards}</ul>
        {loading ? <div className={style.more}>글을 불러오고 있습니다..</div> : null}
        {isEmpty ? <div className={style.more}>불러올 글이 없습니다</div>:<button className={style.more_btn} onClick={fetchMore}>더보기</button>}
        <div>
        <button className={style.write} onClick={boardWrite}>글쓰기</button>
        </div>
        <BoardSearch />
        </div>
    )
}

export default Board;