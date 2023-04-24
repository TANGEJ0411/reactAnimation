import React, { useContext, useEffect, useState } from 'react'
import { isLoginContext } from '../../App';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';

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
        </>
    )
}

export default TicketShow