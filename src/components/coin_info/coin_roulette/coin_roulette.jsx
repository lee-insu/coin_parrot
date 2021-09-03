import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import styles from './coin_roulette.module.css';
import ReactGA from 'react-ga';


const CoinRoulette = () => {
    

    const [one,getOne] = useState();
    const [two,getTwo] = useState();
    const [three,getThree] = useState();

    
    const data = [
        { option: one, style: { backgroundColor: '#1d6ef0', textColor: '#fff' } },
        { option: two, style: { backgroundColor: '#6ba0f7',textColor: '#fff' } },
        { option: three, style: { backgroundColor: '#9dc2ff',textColor: '#fff' }  },
      ]

      const [roulette,rouletteActive] = useState(false);
      const [mustSpin, setMustSpin] = useState(false);
      const [prizeNumber, setPrizeNumber] = useState(0);
    
      const handleSpinClick = () => {
        ReactGA.event({
            category: 'roulette',
            action: 'click',
            label: 'roulette spin click'
          });

        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
      }

    const onChange = e => {
        const {target:{name,value}} = e;
        if(name ==='one') {
            getOne(value);
        }else if(name ==='two') {
            getTwo(value);
        }else if(name === 'three') {
            getThree(value);
        }
    }

    return (
        <>
        <div className={styles.title}>코인 룰렛돌리기</div>
        {roulette ? 
        <>
        <div className={styles.roulette}>
         <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#f2f2f2"]}
          outerBorderWidth={[15]}
          radiusLineWidth={[10]}
          fontSize={[30]}
          perpendicularText={[true]}
  
          onStopSpinning={() => {
            setMustSpin(false)
          }}
        />
        {!mustSpin ? 
           <>
            <button className={styles.button_roulette} onClick={handleSpinClick}>돌리기</button>
            <button className={styles.button_roulette} onClick={()=>rouletteActive(false)}>다시 쓰기</button>
            </>
            :
            null
        }
        </div>
        <div className={styles.option}>{!mustSpin ? data[prizeNumber].option : null}</div>
        </>
        : 
        <>
        <div className={styles.write}>
             <input 
        type="text"
        name="one"
        value={one}
        onChange={onChange}
        placeholder="첫 번째 코인을 적어주세요"
        />
  
        <input 
        type="text"
        name="two"
        value={two}
        onChange={onChange}
        placeholder="두 번째 코인을 적어주세요"
        />
  
        <input 
        type="text"
        name="three"
        value={three}
        onChange={onChange}
        placeholder="세 번째 코인을 적어주세요"
        />
        </div> 
        <button className={styles.button} onClick={()=>rouletteActive(true)}>결정</button>
        </>
        }
        
        </>
    );
};

export default CoinRoulette;