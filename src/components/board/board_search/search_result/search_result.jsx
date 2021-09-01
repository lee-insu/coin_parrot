import React from 'react';
import style from './search_result.module.css';

const SearchResult = ({search}) => {


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
        <ul>
            {resultArray}
        </ul>
    );
};

export default SearchResult;