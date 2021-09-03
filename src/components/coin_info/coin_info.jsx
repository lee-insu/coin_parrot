import React, { useEffect, useState } from 'react';
import CoinChart from './coin_chart/coin_chart';
import CoinRoulette from './coin_roulette/coin_roulette';
import CoinSelect from './coin_select/coin_select';
import styles from './coin_info.module.css';
import Footer from '../footer/footer';

const CoinInfo = () => {

    const [coins,getCoins] =useState();

    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(res => res.json())
        .then(async res => {
            const list = await res.map(coin => coin);
            const expectBtc = list.filter(e => {return e.market.indexOf('BTC-')});
            const expectUsdt = expectBtc.filter(e=> {return e.market.indexOf('USDT-')});
            getCoins(expectUsdt);
            
        })

    },[])




    return (
        <div className={styles.session}>
        <div className={styles.coin_select}><CoinSelect coins ={coins}/></div>
        <div className={styles.ad}>ad</div>
        <div className={styles.coin_roulette}><CoinRoulette /></div>
        <div className={styles.ad}>ad</div>
        <div className={styles.coin_chart}> <CoinChart /></div>
        <Footer/>

        </div>
    );
};

export default CoinInfo;