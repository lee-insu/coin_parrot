import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../../service/firebase';
import style from './like.module.css';

const Like = ({login,userInfo}) => {


    const [like,setLike] = useState(false);
    const [likeNum,getLikeNum] = useState('');
    const params = useParams();

    const fistore = firestore.collection('board').doc(`${params.id}`).collection('like').doc(`${userInfo.uid}`);
    const fiStoreLike = firestore.collection('board').doc(`${params.id}`).collection('like');

    const increaseLike = async(e) => {
        e.preventDefault();
        if (login) {
            if(!like) {
                await fistore.set({
                    like:true,
                    uid:userInfo.uid
                })
                setLike(true);
            }else{
                await fistore.delete();
                setLike(false);
            }
        }else{
            alert('로그인이 필요합니다');
        }
    }

    if(userInfo) {
        fiStoreLike.get().then(result => {
            result.forEach(doc => {
                if(doc.id === userInfo.uid){
                    setLike(true);
                }
            })
        })
    }

    useEffect(()=> {
        if(like || !like){
            fiStoreLike.get().then(snap => {
                let count = snap.size;
                getLikeNum(count);
            })
        }

    },[like,login])



    return (
        <div>
             <div className={style.like_num}>모인 새모이:{likeNum}</div>
             {like ? 
             <button className={style.true} onClick={increaseLike}>새모이 ♥ </button>
             :
             <button className={style.false} onClick={increaseLike}>새모이 주기</button>
             }
             
        </div>
    );
};

export default Like;