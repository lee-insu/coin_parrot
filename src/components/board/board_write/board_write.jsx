import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../../service/firebase';
import style from './board_write.module.css';

const BoardWrite = ({userInfo}) => {
    
    const[title, getTitle] = useState('');
    const[content, getContent] = useState('');
    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} = e;
        if(name ==='title') {
            getTitle(value);
        }else if(name === 'content') {
            getContent(value);
        }
    }

    const store = firestore.collection('board');

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            store.add({
            title,
            content,
            uid:userInfo.uid,
            name:userInfo.displayName,
            views:0,
            time:`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 ${new Date().getDate()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분 `,
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            date: new Date().getDate()
            })
            history.push('/board');
        }catch(err){
            alert(err);
        }
    }
 

    return (
     <div className={style.session}>
        <form className = {style.form} onSubmit={onSubmit}>
           
            <input 
            className={style.title}
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="제목"
            required
            />
            <textarea 
            className={style.content}
            type="text"
            name="content"
            value={content}
            onChange={onChange}
            placeholder="내용을 적어주세요"
            required
            />
            <input className = {style.btn} type="submit" value="올리기" />
        </form>
       </div>
    );
};

export default BoardWrite;