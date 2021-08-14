import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firestore } from '../../service/firebase';

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
        store.startAfter(lastDoc).limit(3)
        .onSnapshot(snapshot =>{
            onSnapshotState(snapshot);
        })
    };


    useEffect(()=> {
        store.limit(3)
        .onSnapshot(snapshot => {
           onSnapshotState(snapshot);
        })
    },[])


    const boards = board.map(bd => 
    <li key={bd.id}>
        <Link to={`/board/${bd.id}`}>
            <h3>{bd.title}</h3>
        </Link>
        <h4>{bd.content}</h4>
    </li>
    )
    
    return (
        <>
        <ul>{boards}</ul>
        {loading ? <h3>글을 불러오고 있습니다..</h3> : null}
        {isEmpty ? <h3>불러올 글이 없습니다</h3>:<button onClick={fetchMore}>더보기</button>}
        <button onClick={boardWrite}>글쓰기</button>
        </>
    )
}

export default Board;