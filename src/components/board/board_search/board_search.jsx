import React from 'react';
import style from './board_search.module.css';
import { connect } from 'react-redux';
import { searchData } from '../../../service/store';
import { useHistory } from 'react-router-dom';

const BoardSearch = ({word,searchData}) => {

    const history = useHistory();


    const onChange = e => {
        const value = e.target.value;
        searchData(value);
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        history.push(`/board/${Object.values(word)}/search`);
    }

    return (
        <>
        <form className={style.form} onSubmit={onSubmit}>
            <input 
            className={style.search}
            type="text"
            onChange={onChange}
            placeholder="찾고 싶은 제목을 입력하세요"
            required
            />
            <input className={style.btn} type="submit" value="검색"/>
        </form>
        </>

       
    )
}   

    const mapStateToProps = (state,props) => {
        return {word:state}
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            searchData:(text) => dispatch(searchData(text))
        }
    }

export default connect(mapStateToProps,mapDispatchToProps) (BoardSearch);