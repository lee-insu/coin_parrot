import React from 'react';
import style from './footer.module.css';

const Footer = () => {
    return (
        <div className={style.session}>
            <div className={style.footer}>
            코인앵무새는 제공하는 모든 암호화폐 정보에 대해 <strong>어떠한 책임을 지지 않습니다</strong>. 
            <p>
            암호화페는 전적으로 스스로의 책임인 점을 염두하시길 바랍니다. 
            </p>
            
            <p className={style.p}>
            편하게 말해서 미친 앵무새 믿고 투자하는 사람은 없제?
            <br/>
            진짜 룰렛 돌리고 오ㅋ 이거다 하고 매수에 손가락 버튼 올리면 나 섭섭해
            <br/>
            그냥 진짜~~~~~~~ 재미로만 하는거다?
            <br/>
            진짜 진짜 재미로만 해야 돼!! 나 책임 못 져!
            </p>
            </div>
        </div>
    );
};

export default Footer;