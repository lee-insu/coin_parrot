import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth, firestore } from '../../../service/firebase';
import style from './sign_up.module.css';

const SignUp = () => {  

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [nickname, setNickName] = useState("");

    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} = e;

        if (name ==='email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }else if (name === 'nickname') {
            setNickName(value);
        }
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        try{
        await firebaseAuth.createUserWithEmailAndPassword(email,password).then(result=> {
            result.user.updateProfile({displayName:nickname});
            firestore.collection("user").doc(result.user.uid).set({
                email:email,
                name: nickname
            })
        })
        history.push('/')
     }catch(err) {
         if(err.code ==='auth/weak-password'){
             alert('비밀번호는 6자 이상!');
             setPassword("");
         }else if(err.code === 'auth/invalid-email'){
             alert('이메일의 양식이 맞지 않습니다');
             setEmail("");
             setPassword("");
         }
     }
    }




    return (

        <div className={style.session}>
        <div className={style.title}>회원가입</div>
        <form className={style.form} onSubmit={onSubmit}>
            <div className={style.inputTag}>이메일</div>
            <input 
            className={style.input}
            type="text"
            name="email"
            value={email}
            placeholder="이메일을 적어주세요"
            onChange={onChange}
            required
            />

            <div className={style.inputTag}>패스워드</div>
            <input 
            className={style.input}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 적어주세요"
            onChange={onChange}
            required
            />

            <div className={style.inputTag}>닉네임</div>
            <input 
            className={style.input}
            type="text"
            name="nickname"
            value={nickname}
            placeholder="닉네임을 적어주세요"
            onChange={onChange}
            required
            />

            <input 
            className={style.button}
            type="submit" 
            value="가입하기"
            />
        </form>
        </div>
    )
}

export default SignUp;