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
    
            </div>
        </div>
    );
};

export default Footer;