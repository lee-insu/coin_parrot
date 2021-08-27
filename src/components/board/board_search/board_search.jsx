import React, { useState } from 'react';
import { firestore } from '../../../service/firebase';
import SearchResult from './search_result/search_result';
import style from './board_search.module.css';

const BoardSearch = () => {
    
    const [search,setSearch] = useState();
    const [result,getResult] = useState();

    const onChange = e => {
        const value = e.target.value;
        setSearch(value);
    }

 

    const onSubmit = async(e) => {
        e.preventDefault();
        await firestore.collection("board").where("title",">=",search).where("title","<=",search + "\uf8ff")
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
                getResult(array)
        })
    }



    return (
        <>
        <form className={style.form} onSubmit = {onSubmit}>
            <input 
            className={style.search}
            type="text"
            value={search}
            onChange={onChange}
            placeholder="찾고 싶은 제목을 입력하세요"
            required
            />
            <input className={style.btn} type="submit" value="검색"/>
        </form>
        <SearchResult search = {result} />
        </>

       
    )
}

export default BoardSearch;