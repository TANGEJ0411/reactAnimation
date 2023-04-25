import React, { useContext, useEffect, useState } from 'react'
import { isLoginContext } from '../../App';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import detailPic from '../../image/detailpic.png'
import './TicketShow.scss'
import TicketShowList from './TicketShowList';

function TicketShow() {
    const [logReq, setLogReq] = useState(false)
    const navigate = useNavigate()
    const isLoggin = useContext(isLoginContext)
    useEffect(() => {
        async function liffLogin() {
            try {
                await liff.ready
                liff.login()
            } catch (error) {
                console.log(error)
            }
        }
        if (logReq) { liffLogin() }
    }, [logReq])

    return (
        <>
            {isLoggin ? <button>登出</button> : <button onClick={() => { setLogReq(true) }}>Line登入</button>}
            <div className='tic-detail-container'>
                <div className='tic-detail-imgbox'>
                    <img src={detailPic} alt='票券細節' className='tic-detail-img' />
                </div>
                <div className='tic-detail-textbox'>
                    <h1 className='tic-detail-title'>極上一泊二食 | 2022ITF台北國際旅展住宿券</h1>
                    <div className='d-flex justify-content-between mt-3 tic-detail-titlebox'>
                        <h2 className='tic-detail-price'>$19,999</h2>
                        <button className='tic-amount-btn'>2 張</button>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <p className='tic-detail-text'>優惠期限</p>
                        <p className='tic-detail-text'>2023/01/01 - 2023/12/31</p>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <p className='tic-detail-text'>適用分館</p>
                        <p className='tic-detail-text'>台中五星</p>
                    </div>
                </div>
            </div>
            <TicketShowList />
        </>
    )
}

export default TicketShow