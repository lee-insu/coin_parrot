import React from 'react';

const SearchResult = ({search}) => {


    let resultArray;
    if(search) {
        const result = search.map(doc => 
        <li>
            <a href={`/board/${doc.id}`}>
                <div>{doc.title}</div>
                <div>{doc.content}</div>
            </a>
        </li>)
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