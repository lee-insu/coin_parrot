import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../../service/firebase';

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
            time:new Date(),
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
        <form onSubmit={onSubmit}>
            <input 
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="제목을 적어주세요"
            required
            />
            <input 
            type="text"
            name="content"
            value={content}
            onChange={onChange}
            placeholder="내용을 적어주세요"
            required
            />
            <input type="submit" value="올리기" />
        </form>
    );
};

export default BoardWrite;