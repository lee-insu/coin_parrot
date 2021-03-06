
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Board from './components/board/board';
import BoardEdit from './components/board/board_view/board_edit/board_edit';
import BoardView from './components/board/board_view/board_view';
import BoardWrite from './components/board/board_write/board_write';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import SignIn from './components/header/sign_in/sign_in';
import SignUp from './components/header/sign_up/sign_up';
import { firebaseAuth } from './service/firebase';
import ReactGA from 'react-ga';
import SearchResult from './components/board/board_search/search_result/search_result';


function App() {
  

  const [userInfo, getUserInfo] = useState('');
  const [login, getLogin] = useState(false);


  useEffect(()=> {
      ReactGA.initialize(process.env.REACT_APP_GA);
      ReactGA.pageview(window.location.pathname + window.location.search);
      firebaseAuth.onAuthStateChanged(user => {
        if(user) {
          getUserInfo(user);
          getLogin(true);
        }else {
          getLogin(false);
        }
      })

      let ins = document.createElement('ins');
      let scr = document.createElement('script');

        ins.className = 'kakao_ad_area';
        ins.style = "display:none; width:100%;";
        scr.async = 'true';
        scr.type = "text/javascript";
        scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '100');
        ins.setAttribute('data-ad-unit', 'DAN-2uCko65PyapmFKN4');


  },[])

  return (

    <div className={styles.app}>
    <BrowserRouter >
    <Header login = {login} userInfo={userInfo}/>
      <Switch>
        <Route exact path ='/' component={CoinInfo}/>
          <Route exact path ='/signin' component={SignIn}/>
          <Route exact path ='/signup' component={SignUp}/>
          <Route exact path ='/board' component={()=><Board login={login}/>}/>
          <Route exact path ='/board/write' component={()=><BoardWrite userInfo={userInfo}/>}/>
          <Route exact path = '/board/:id'  component={()=><BoardView login={login} userInfo={userInfo}/>}/>
          <Route exact path ='/board/:id/edit' component={BoardEdit}/>
          <Route exact path ='/board/:word/search' component={()=><SearchResult/>}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
