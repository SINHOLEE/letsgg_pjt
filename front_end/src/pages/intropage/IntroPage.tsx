import React, { ReactElement, useState } from 'react'
import Button from '@material-ui/core/Button';
import { Map } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { inject, observer } from "mobx-react";
import 'pages/intropage/intropage.scss';

interface Props {
}

function IntroPage({ }: Props): ReactElement {
    const [cookies, setCookie, removeCookie] = useCookies(['introSkip']);
    const [subTitleVisibleHidden, setSubTitleVisibleHidden] = useState<string>('initial');
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const history = useHistory();
    history.push('/map');
    // 창 크기 조절
    const addCookie = () => {
        const expiresDate = new Date();
        expiresDate.setHours(23);
        expiresDate.setMinutes(59);
        expiresDate.setSeconds(59);
        // console.log(expiresDate);
        setCookie('introSkip', true, { expires: expiresDate });
    }
    if (cookies.introSkip !== undefined) {
        if (!isMouseOver) {
            history.push('/map');
        }
    } else {
        addCookie();
    }

    const handleTitleMouseOver = () => {
        setIsMouseOver(true);
        setSubTitleVisibleHidden('visible');
    }
    const handleTitleMouseOut = () => {
        setIsMouseOver(true);
        setSubTitleVisibleHidden('hidden');
    }
    return (
        <div className="intro-wrap">
            <div className="intro-content">
                <div className="intro-title" onMouseOver={handleTitleMouseOver} onMouseOut={handleTitleMouseOut}>
                    LETS 경기
                    <div className={`intro-sub-title ${subTitleVisibleHidden}`}>Local Exchange Trading System</div>
                </div>
                <div className='intro-introduction'>
                    경기 지역화폐 지도 검색 서비스<br />
                    <br />
                    {/* 여기는 대략적인 설명문이 들어가는 위치입니다.<br />
                    여기는 대략적인 설명문이 들어가는 위치입니다.<br /> */}
                </div>
                <Link to='/map'>
                    <div className="intro-map-icon" >
                        <div className="intro-map-icon-content">
                            <Map className="icon" /><br />
                            <div className="text">
                                지도로 가기
                        </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="intro-footer">
                data.go.kr , kakao map api
            </div>
        </div>
    )
}

export default inject(({ }) => ({
}))(observer(IntroPage));