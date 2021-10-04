import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../../../service/firebase';
import style from './search_result.module.css';

const SearchResult = ({word}) => {
    
    const [search,setSearch] = useState('')
    const searchWord = Object.values(word).[0];
   


    useEffect(()=> {
            firestore.collection('board').where('title',">=",searchWord)
            .where("title","<=",searchWord + "\uf8ff")
            .onSnapshot(snapshot => {
                const array = snapshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data()
                }))
                setSearch(array);
            })

    },[])

  

    let resultArray;
    if(search) {
        const result = search.map(doc => 
         <a href={`/board/${doc.id}`}>
             <li className={style.li} >
                <div className={style.border}>
                <div className={style.title}>{doc.title}</div>
                <div className={style.content}>{doc.content}</div>   
                <div className={style.user_info}>
                     <div>{doc.name} {doc.month}-{doc.date}</div>
                    <div>조회:{doc.views}</div>
                </div>
                </div>
               
            </li>
        </a>
        )
        resultArray = result;
    }else {
        <li>검색 결과가 없습니다.</li>
    }




    return (
        <div className={style.session}>
         <ul className={style.ul}>
             {resultArray}
         </ul>
        </div>
    );
};


    const mapStateToProps = (state) => {
        return {
            word:state
        }
    };

export default connect(mapStateToProps) (SearchResult);