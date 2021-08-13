
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import SignIn from './components/header/sign_in/sign_in';
import SignUp from './components/header/sign_up/sign_up';
import { firebaseAuth } from './service/firebase';


function App() {
  

  const [userInfo, getUserInfo] = useState();
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
    <BrowserRouter>
    <Header login = {login} userInfo={userInfo}/>
      <Switch>
          <Route exact path ='/' component={CoinInfo}/>
          <Route exact path ='/signin' component={SignIn}/>
          <Route exact path ='/signup' component={SignUp}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
