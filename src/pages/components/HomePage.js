import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import { isLoginContext } from '../../App'
import MyOtpInput from './MyOtpInput';
import OTPInput from 'react-otp-input';
import './OtpInput.css';


function HomePage() {
    const navigate = useNavigate()
    const isLoggin = useContext(isLoginContext)
    const [otp, setOtp] = useState('');
    const onChange = (value) => setOtp(value);
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
    const hadleSubmit = (e) => {
        e.preventDefault()
        console.log(otp, '123')
    }
    return (
        <>
            <h1>我是首頁</h1>
            <h3>請點登入後用line登入</h3>
            {/* <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                containerStyle={{ justifyContent: 'center' }}
                inputStyle={{ margin: '10px', width: '30px', 'input:focus': 'border:1px solid red' }}
                renderInput={(props) => <input {...props} />}
            /> */}
            {/* <MyOtpInput value={otp} valueLength={6} onChange={onChange} /> */}
            <form onSubmit={hadleSubmit}>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props, index) => <input
                        {...props}
                        className="otp-input"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                    />}
                    shouldAutoFocus={true}
                    inputType='tel'
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default HomePage