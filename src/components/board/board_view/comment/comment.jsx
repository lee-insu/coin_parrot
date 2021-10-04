import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../service/firebase';
import style from './comment.module.css';

const Comment = ({params,userInfo}) => {

    const [write,setWrite] = useState('');
    const [comments,setComments] = useState([]);
    const fistore = firestore.collection("comments").doc(params).collection("comment");

    const onChange = e => {
        const value = e.target.value;
        setWrite(value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            alert('댓글 작성 완료!');
            await fistore.add({
                comment:write,
                name:userInfo.displayName,
                uid:userInfo.uid,
                time:`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 ${new Date().getDate()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분 `
            });
            setWrite('');
        }catch(err) {
            alert(err)
        }
    }


    const onDelete = async(cmtId,cmtUid) => {
        if(cmtUid === userInfo.uid) {
            const del = window.confirm('댓글을 삭제하겠습니까?');
            if(del) {
                await fistore.doc(cmtId).delete();
            }
        }else{
            alert('댓글 작성자가 아닙니다');
        }
    }


    useEffect(()=> {
        fistore.orderBy('time')
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setComments(array);
        })
    },[])


    const cmts = comments.map(comment => 
        <li className={style.li} key={comment.id}>
                <div className={style.comment_info}>
                    <div className={style.comment}>{comment.comment}</div>
                    <div className={style.user_info}>
                        <div className={style.name}>{comment.name}</div>
                        <div className={style.time}>{comment.time}</div>
                    </div> 
                </div>
                 <button className={style.delete} 
                 onClick={()=>onDelete(comment.id,comment.uid)}>x</button>
        </li>
        )
 

    return (
        <div className={style.session}>
        <ul className={style.ul}> 
            {cmts}
        </ul>

        <form className={style.form} onSubmit = {onSubmit}>
            <input 
            className={style.input}
            type="text"
            value={write}
            onChange={onChange}
            placeholder="댓글을 적어주세요"
            required
            />
            <input className={style.submit} type="submit" value="올리기"/>
        </form>
        </div>
    );
};

export default Comment;