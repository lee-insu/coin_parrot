import {createStore} from 'redux';


const searchWord = 'search';


export const searchData = word => {
    return{
        type:searchWord,
        word
    }
}


const reducer = (state, action) => {
    switch(action.type) {
        case searchWord :
            return {word:action.word}
        default:
            return state
    }
}



const store = createStore(reducer);


export default store;