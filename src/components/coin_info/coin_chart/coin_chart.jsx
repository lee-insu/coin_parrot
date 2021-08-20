import React, { useEffect, useState } from 'react';

const CoinChart = () => {
        
    const [coin,getCoin] =useState(false);
    const coinList = 'krw-btc,krw-eth,krw-ada,krw-xrp,krw-doge,krw-dot,btc-luna'
    const [btc,getBtc] = useState();
    const [eth,getEth] = useState();
    const [ada,getAda] = useState();
    const [xrp,getXrp] = useState();
    const [doge,getDoge] = useState();
    const [dot,getDot] = useState();
    const [luna,getLuna] = useState();


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
                getDot(array[5]);
                getLuna(array[6]);
                getCoin(true)
            })
        },4000)
    },[])



    return (
        <table>
            <thead>
                <tr>
                    <th>코인</th>
                    <th>가격(upbit)</th>
                    <th>전일대비</th>
                </tr>
            </thead>
            <tbody>
                {coin ? 
                <>
                 <tr>
                    <th>비트코인</th>
                    <th>{btc.trade_price}</th>
                    <th>{(btc.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                 <tr>
                    <th>이더리움</th>
                    <th>{eth.trade_price}</th>
                    <th>{(eth.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>에이다</th>
                    <th>{ada.trade_price}</th>
                    <th>{(ada.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>리플</th>
                    <th>{xrp.trade_price}</th>
                    <th>{(xrp.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>도지코인</th>
                    <th>{doge.trade_price}</th>
                    <th>{(doge.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>폴카닷</th>
                    <th>{dot.trade_price}</th>
                    <th>{(dot.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>루나</th>
                    <th>{luna.trade_price}</th>
                    <th>{(luna.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                </>
                :<div>정보를 불러오고 있습니다..</div>}
            </tbody>
        </table>
    );
};

export default CoinChart;