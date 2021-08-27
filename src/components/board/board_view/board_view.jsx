import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firestore } from '../../../service/firebase';
import firebase from 'firebase/app';
import Comment from './comment/comment';
import Like from './like/like';
import style from './board_view.module.css';

const BoardView = ({login, userInfo}) => {

    const userDoc = userInfo;
    const [title, getTitle] = useState('');
    const [content, getContent] = useState('');
    const [user, getUser] = useState({
        name:'',
        uid:''
    });
    const [time,getTime] = useState({
        year:'',
        mon:'',
        date:''
    });
    const [views,getViews] = useState('');
    const params = useParams();
    const history = useHistory();

    const store = firestore.collection('board').doc(`${params.id}`)
    const comment = firestore.collection('comments').doc(`${params.id}`).collection('comment');



    const onEdit = () => {
        if(login && userInfo.uid === user.uid) {
            try{
                history.push(`/board/${params.id}/edit`);
            }catch(err) {
                alert(err);
            }
        }else if(login && userInfo.uid !== user.uid) {
            alert('글 작성자만 수정할 수 있습니다');
        }else {
            alert('글 작성자입니까?');
            history.push('/signin');
        }
    }

    const onDelete = async() => {
        const del = window.confirm('정말로 글을 삭제하고 싶습니까?');
        if(del) {
            await store.delete();
            if(del) {
                await comment.get().then(cmt => {
                    const size = cmt.size;
                    for(let i = 0; i < size; i++){
                        comment.get().then(docs => {
                            docs.forEach(doc => {
                                comment.doc(doc.id).delete();
                            })
                        })
                    }
                })
                if(del) {
                    await firestore.collection('comments').doc(`${params.id}`).delete();
                }
            }
            alert('글이 삭제되었습니다');
            history.push('/board');
        }
    }

    const increment = firebase.firestore.FieldValue.increment(1);


    useEffect(()=> {
        store.update({
            views:increment
        })


        store.get().then(result=> {
            const data = result.data();
            getTitle(data.title);
            getContent(data.content);
            getUser({
                name:data.name,
                uid:data.uid
            });
            getTime({
                year:data.year,
                mon:data.month,
                date:data.date
            });
            getViews(data.views);
        })
    },[])

    return(

        <div className={style.session}>
            <div className={style.ad}>ad</div>
            <div className={style.content_info}>
                 <div className={style.title}>{title}</div>
                 <div className={style.user_info}>
                 <div className={style.info}>
                     <div className={style.name}>{user.name}님 </div>
                     <div className={style.time}>{time.year}년 {time.mon}월 {time.date}일</div>
                 </div>
                      <div className={style.views}>조회수:{views}</div>
                </div>
            <div className={style.content}>{content}</div>
            
            
            
            {login && userInfo.uid === user.uid ? 
            <>
            <button className={style.edit} onClick={onEdit}>수정하기</button> 
            <button className={style.delete} onClick={onDelete}>삭제하기</button> 
            </>:
             null }
             <Like login={login} userInfo={userDoc}/>
            <Comment params = {params.id} userInfo = {userDoc} />
            </div>
        </div>
        
    )
}
export default BoardView;