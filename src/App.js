
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


function App() {
  

  const [userInfo, getUserInfo] = useState('');
  const [login, getLogin] = useState(false);


  useEffect(()=> {

      firebaseAuth.onAuthStateChanged(user => {
        if(user) {
          getUserInfo(user);
          getLogin(true);
        }else {
          getLogin(false);
        }
      })


  },[])

  return (
    <div className={styles.app}>
    <BrowserRouter>
    <Header login = {login} userInfo={userInfo}/>
      <Switch>
        <Route exact path ='/' component={CoinInfo}/>
          <Route exact path ='/signin' component={SignIn}/>
          <Route exact path ='/signup' component={SignUp}/>
          <Route exact path ='/board' component={()=><Board login={login}/>}/>
          <Route exact path ='/board/write' component={()=><BoardWrite userInfo={userInfo}/>}/>
          <Route exact path = '/board/:id'  component={()=><BoardView login={login} userInfo={userInfo}/>}/>
          <Route exact path ='/board/:id/edit' component={BoardEdit}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
