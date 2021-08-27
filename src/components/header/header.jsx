import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../service/firebase';


const Header = ({login,userInfo}) => {

    const logout = () => {
        firebaseAuth.signOut();
        window.location.replace("/")
    }
    
    return (
        <nav className={styles.nav}>

            <div className={styles.align}>
            <div className={styles.logo}><Link to='/'>코인앵무새</Link></div>
            <ul className={styles.ul_menu}>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/board'>코인토론</Link></li>
            </ul>
            </div>
            {login ?
                 <div className={styles.login}>
                 <div className={styles.name}>{userInfo.displayName}님</div>
                 <button className={styles.logout} onClick={logout}>로그아웃</button>
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