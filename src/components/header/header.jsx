import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../service/firebase';
import ReactGA from 'react-ga';


const Header = ({login,userInfo}) => {

    const logout = () => {
        firebaseAuth.signOut();
        window.location.replace("/")
    }

    const board = () => {
        ReactGA.event({
            category: 'board',
            action: 'click',
            lael:'board page'
          });
    }

 
    
    return (
        <nav className={styles.nav}>

            <div className={styles.align}>
            <div className={styles.logo}><Link to='/'>코인앵무새</Link></div>
            <ul className={styles.ul_menu}>
                <li><Link to='/'>홈</Link></li>
                <li onClick={board}><Link to='/board'>코인토론</Link></li>
            </ul>
            </div>
            {login ?
                 <div className={styles.login}>
                 <div className={styles.name}>{userInfo.displayName}님</div>
                 <img className={styles.log_img} onClick={logout} src="/static/img/logout.svg" alt="logout"/>
            </div>
            :
            <ul className={styles.ul_sign}>
                <li><Link to='signin'>로그인</Link></li>
                <li><Link to='signup'>회원가입</Link></li>
            </ul>
            }
           
        </nav>
    )
}

export default Header;