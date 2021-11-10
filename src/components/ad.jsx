import React, { useEffect, useState } from 'react';

export const Ad = () => {

    const [attr, setAttr] = useState();

    useEffect(()=> {
        const classname = {className:'kakao_ad_area',style:{display:'none',width:'100%'},
        'data-ad-width':'320','data-ad-height':'100','data-ad-unit':'DAN-2uCko65PyapmFKN4'}

        setAttr(classname);
    },[])
    

    return React.createElement('ins', attr, null)
}





