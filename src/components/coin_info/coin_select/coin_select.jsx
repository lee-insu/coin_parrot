import React, { useState } from 'react';

const CoinSelect = ({coins}) => {

    const [coin,CoinSelect] = useState(null);
    const [price,getPrice] = useState();
    const [changeRate,getChangeRate] = useState();
    const [ready,setReady] = useState(true);
    const [loading,setLoading] = useState(false);
    const [result,setResult] =useState(false);

    const CoinSelected = () => {

        const setCoin = () => {
            setTimeout(()=> {
                setLoading(false);
                setResult(true);
                const selected = coins[Math.floor(Math.random() * coins.length)]
                CoinSelect(selected.korean_name);
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
        <>
        
            {ready ? <img src="#" alt="ready image"/>:null}
            {loading ? <img src="#" alt="loading image"/>:null}
            {result ? <img src="#" alt="result image"/>:null}
            <button onClick={CoinSelected}>{coin === null ? "코인랜덤뽑기":"다시뽑기"}</button>
            {coin ? 
              <>
                <div>{coin}</div>
                <div>{price}원</div>
                <div>{changeRate}%</div>
                </>
            :null}
        </>
    );
};

export default CoinSelect;