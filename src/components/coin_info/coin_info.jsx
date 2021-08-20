import React, { useEffect, useState } from 'react';
import CoinSelect from './coin_select/coin_select';

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
        <>
        <CoinSelect coins ={coins}/>
        </>
    );
};

export default CoinInfo;