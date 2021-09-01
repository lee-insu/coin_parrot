import React, { useEffect, useState } from 'react';
import styles from './coin_chart.module.css';

const CoinChart = () => {
        
    const [coin,getCoin] =useState(false);
    const coinList = 'krw-btc,krw-eth,krw-ada,krw-xrp,krw-doge,krw-dot,btc-luna'
    const [btc,getBtc] = useState();
    const [eth,getEth] = useState();
    const [ada,getAda] = useState();
    const [xrp,getXrp] = useState();
    const [doge,getDoge] = useState();
  


    useEffect(()=> {
        setInterval(()=>{
            fetch(`https://api.upbit.com/v1/ticker?markets=${coinList}`)
            .then(res => res.json())
            .then(async res => {
                const price = await res.map(coin => coin);
                const array = Object.assign(price);
                getBtc(array[0]);
                getEth(array[1]);
                getAda(array[2]);
                getXrp(array[3]);
                getDoge(array[4]);
                getCoin(true)
            })
        },2000)
    },[])



    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.thead_tr}>
                    <th>코인</th>
                    <th>가격(upbit)</th>
                    <th>전일대비</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {coin ? 
                <>
                 <tr>
                    <th>비트코인</th>
                    <th>{btc.trade_price}</th>
                    <th className={(btc.signed_change_rate*100).toFixed(2) >= 0 ? styles.changeRate : styles.changeRate_u}>
                        {(btc.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                 <tr>
                    <th>이더리움</th>
                    <th>{eth.trade_price}</th>
                    <th className={(eth.signed_change_rate*100).toFixed(2) >= 0 ? styles.changeRate : styles.changeRate_u}>
                        {(eth.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>에이다</th>
                    <th>{ada.trade_price}</th>
                    <th className={(ada.signed_change_rate*100).toFixed(2) >= 0 ? styles.changeRate : styles.changeRate_u}>
                        {(ada.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>리플</th>
                    <th>{xrp.trade_price}</th>
                    <th className={(xrp.signed_change_rate*100).toFixed(2) >= 0 ? styles.changeRate : styles.changeRate_u}>
                        {(xrp.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>도지코인</th>
                    <th>{doge.trade_price}</th>
                    <th className={(doge.signed_change_rate*100).toFixed(2) >= 0 ? styles.changeRate : styles.changeRate_u}>
                        {(doge.signed_change_rate*100).toFixed(2)}</th>
                </tr>
             
                </>
                :<div>정보를 불러오고 있습니다..</div>}
            </tbody>
        </table>
    );
};

export default CoinChart;