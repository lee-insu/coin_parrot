import React, { useState } from 'react';
import styles from './coin_select.module.css';

const CoinSelect = ({coins}) => {

    const [coin,coinSelect] = useState(null);
    const [price,getPrice] = useState();
    const [changeRate,getChangeRate] = useState();
    const [ready,setReady] = useState(true);
    const [loading,setLoading] = useState(false);
    const [result,setResult] =useState(false);

    const CoinSelected = () => {

        const setCoin = () => {
            coinSelect(null);
            setTimeout(()=> {
                setLoading(false);
                setResult(true);
                const selected = coins[Math.floor(Math.random() * coins.length)]
                coinSelect(selected.korean_name);
                getMarket(selected.market);
            },2000)
        }

        if(!coin) {
            setReady(false);
            setLoading(true);
            setCoin()
        }else{
            setResult(false);
            setLoading(true);
            setCoin();
        }
    }
    

    const getMarket = market => {
        fetch(`https://api.upbit.com/v1/ticker?markets=${market}`)
        .then(res => res.json())
        .then(async res => {
            await res.map(coin => {
                getPrice(coin.trade_price);
                getChangeRate((coin.signed_change_rate*100).toFixed(2))
            });
        })

    }



    return (
        <div className={styles.session}>
            <div className={styles.img}>
            {ready ? <img src="/static/img/업비트1.jpeg" alt="ready image"/>:null}
            {loading ? <img src="/static/img/업비트3.gif" alt="loading image"/>:null}
            {result ? <img src="/static/img/업비트2.jpeg" alt="result image"/>:null}
            </div>
            <div className={styles.content}>
            {ready ? <div>미친 코인앵무새로 <br/> 신탁을 받으세요</div>:null}
            {loading ? <div>미친 코인앵무새가 <br/>신탁을 내리고 있습니다..</div>:null}
            {result ? <div>당신에게 내려진 코인은</div>:null}
            </div>
            {coin ? 
              <>
                <div className={styles.coin}>{coin}</div>
                <div className={styles.price}>{price}원</div>
                <div className={changeRate >= 0 ? styles.changeRate : styles.changeRate_u}>{changeRate}%</div>
                </>
            :null}
            {coin === null ? 
            !loading ? 
            <button className={styles.button} onClick={CoinSelected}>잘 부탁드립니다</button>
            : null
            :
            <button className={styles.button} onClick={CoinSelected}>하..한 번만 더요!</button>
            }
           
        </div>
    );
};

export default CoinSelect;