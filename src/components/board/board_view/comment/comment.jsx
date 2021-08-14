import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../service/firebase';

const Comment = ({params,userInfo}) => {

    const [write,setWrite] = useState('');
    const [comments,setComments] = useState([]);
    const store = firestore.collection("comments").doc(params).collection("comment");

    const onChange = e => {
        const value = e.target.value;
        setWrite(value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            alert('댓글 작성 완료!');
            await store.add({
                comment:write,
                name:userInfo.displayName,
                uid:userInfo.uid,
                time:new Date(),
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date: new Date().getDate()
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
                await store.doc(cmtId).delete();
            }
        }else{
            alert('댓글 작성자가 아닙니다');
        }
    }


    useEffect(()=> {
        store.orderBy('time')
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setComments(array);
        })
    },[])


    const cmts = comments.map(comment => 
        <li key={comment.id}>
            <div>{comment.comment}</div>
            <div>작성자{comment.name}</div>
            <button onClick={()=>onDelete(comment.id,comment.uid)}>삭제</button>
        </li>
        )
 

    return (
        <>
        <ul>
            {cmts}
        </ul>

        <form onSubmit = {onSubmit}>
            <input 
            type="text"
            value={write}
            onChange={onChange}
            placeholder="댓글을 적어주세요"
            required
            />
            <input type="submit" value="올리기"/>
        </form>
        </>
    );
};

export default Comment;