import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import { isLoginContext } from '../../App'


function HomePage() {
    const navigate = useNavigate()
    const isLoggin = useContext(isLoginContext)
    useEffect(() => {
        async function tryAddFriend() {
            try {
                await liff.ready
                const getFriendShip = await liff.getFriendship()
                if (!getFriendShip.friendFlag) {
                    navigate("/addFriend")
                }
                console.log("我輩執行了")
            } catch (error) {
                console.log(error)
            }
        }
        if (isLoggin) {
            console.log("我還沒被執行")
            tryAddFriend()
            console.log("我還沒被執行2")
        }
    }, [isLoggin])
    return (
        <>
            <h1>我是首頁</h1>
            <h3>請點登入後用line登入</h3>
        </>
    )
}

export default HomePage