import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../../../service/firebase';
import firebase from 'firebase/app';

const SignIn = () => {

    const[email, getEmail] = useState("");
    const[password, getPassword] = useState("");
    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} = e;

        if(name ==='email') {
            getEmail(value)
        }else if(name === 'password') {
            getPassword(value);
        }
    };


    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            await firebaseAuth.signInWithEmailAndPassword(email,password)
            history.push('/');
        }catch(err) {
            if(err.code === 'auth/user-not-found') {
                alert("유저 정보가 없습니다");
                getEmail("");
                getPassword("");
            }else if(err.code ==='auth/wrong-password') {
                alert('비밀번호가 틀렸습니다');
                getPassword("");
            }
        }
    }


    const googleSignIn = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseAuth.signInWithPopup(provider)
        try{
            await history.push('/');
        }catch(err) {
            alert("구글 로그인 실패");
        }
        

    }




    return (
        <>
        <form onSubmit={onSubmit}>

            <input 
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일을 적어주세요"
            />

            <input 
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호를 적어주세요"
            />

            <input type="submit" 
            value="로그인"
            />
        </form>

        <button onClick={googleSignIn}>구글로 로그인하기</button>
        </>
    )
}

export default SignIn;