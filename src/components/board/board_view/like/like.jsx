import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../../service/firebase';

const Like = ({login,userInfo}) => {


    const [like,setLike] = useState(false);
    const [likeNum,getLikeNum] = useState('');
    const params = useParams();

    const store = firestore.collection('board').doc(`${params.id}`).collection('like').doc(`${userInfo.uid}`);
    const storeLike = firestore.collection('board').doc(`${params.id}`).collection('like');

    const increaseLike = async(e) => {
        if (login) {
            if(!like) {
                await store.set({
                    like:true,
                    uid:userInfo.uid
                })
                setLike(true);
            }else{
                await store.delete();
                setLike(false);
            }
        }else{
            alert('로그인이 필요합니다');
        }
    }

    if(userInfo) {
        storeLike.get().then(result => {
            result.forEach(doc => {
                if(doc.id === userInfo.uid){
                    setLike(true);
                }
            })
        })
    }

    useEffect(()=> {
        if(like || !like){
            storeLike.get().then(snap => {
                let count = snap.size;
                getLikeNum(count);
            })
        }

    },[like,login])



    return (
        <div>
            <button onClick={increaseLike}>좋아요</button>
             <div>좋아요 수:{likeNum}</div>
             {like ? <div>true</div>:<div>false</div>}
        </div>
    );
};

export default Like;