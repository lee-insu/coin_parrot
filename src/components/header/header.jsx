import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../service/firebase';


const Header = ({login,userInfo}) => {

    const logout = () => {
        firebaseAuth.signOut();
        window.location.replace("/")
    }
    
    return (
        <nav>
            <div><Link to='/'>코인앵무새</Link></div>
            <ul>
                <li><Link to='/'>코인 정보</Link></li>
                <li><Link to='/board'>자유게시판</Link></li>
            </ul>
            {login ?
                 <div>
                 <div>{userInfo.displayName}님</div>
                 <button onClick={logout}>로그아웃</button>
            </div>
            :
            <ul>
                <li><Link to='signin'>로그인</Link></li>
                <li><Link to='signup'>회원가입</Link></li>
            </ul>
            }
           
        </nav>
    )
}

export default Header;