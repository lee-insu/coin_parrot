import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firestore } from '../../../../service/firebase';
import style from './board_edit.module.css';

const BoardEdit = () => {

    const [title, getTitle] = useState();
    const [content, getContent] = useState();
    const params = useParams();
    const history = useHistory();

    const fistore = firestore.collection('board').doc(`${params.id}`)


    const onSubmit = async(e) => {
        e.preventDefault();
        await fistore.update({
            title:title,
            content:content,
            update:`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 ${new Date().getDate()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분 `
        })
        alert('수정이 완료되었습니다.');
        history.push(`/board/${params.id}`);
    }





    const onChange = e => {
        const {target:{name,value}} = e;
        if(name === 'title') {
            getTitle(value);
        }else if(name === 'content') {
            getContent(value);
        }
    };


    useEffect(()=> {
        fistore.get().then(result => {
            const data = result.data();
            getTitle(data.title);
            getContent(data.content);
        })
    },[])


    return (
      <div clssName={style.session}>
         <form className={style.form} onSubmit={onSubmit}>
           <input 
           className={style.title}
           type="text"
           name="title"
           value={title}
           onChange={onChange}
           />

           <textarea 
           className={style.content}
           type="text"
           name="content"
           value={content}
           onChange={onChange}
           />

            <input className = {style.btn} type="submit" value="수정"/>
        </form>
       </div>
    );
};

export default BoardEdit;