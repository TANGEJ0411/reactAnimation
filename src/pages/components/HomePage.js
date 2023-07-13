import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import { isLoginContext } from "../../App";
import MyOtpInput from "./MyOtpInput";
import OTPInput from "react-otp-input";
import "./OtpInput.css";
import DropdownMenu from "./DropdownMenu";
import Permission from "./Permission";
import axios from "axios";

var bcrypt = require("bcryptjs");
const randomFallback = 6;
bcrypt.setRandomFallback(randomFallback);
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
var bcrypt = require("bcryptjs");
bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("B4c0//", salt, function (err, hash) {
    console.log(hash);
    console.log(bcrypt.compareSync("B4c//", hash));
  });
});
function HomePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkPro1, setCheckPro1] = useState("");
  const [checkPro2, setCheckPro2] = useState("");
  const [checkPro3, setCheckPro3] = useState("");

  useEffect(() => {
    initializeLineLiff();
  }, []);

  const initializeLineLiff = async () => {
    try {
      await liff.init({ liffId: "1660858533-loqWyNQE" });
      setIsLoading(false);
    } catch (error) {
      console.error("LIFF Initialization failed", error.message);
    }

    if (liff.isLoggedIn() && liff.getAccessToken()) {
      setIsLoggedIn(true);
      fetchUserData();
    } else if (!loginInProgress) {
      setLoginInProgress(true);
      liff.login();
    }
  };

  const fetchUserData = () => {
    const idToken = liff.getDecodedIDToken();
    console.log(idToken);
    if (idToken.email) {
      setEmail(idToken.email);
    } else {
      console.log("No Email address found in the ID Token");
      liff.logout();
      redirectToLogin();
    }
  };

  const redirectToLogin = () => {
    if (!loginInProgress) {
      setLoginInProgress(true);
      liff.login();
    }
  };
  const corsAny = "https://cors-anywhere.herokuapp.com/";
  const sendChatMessage = async () => {
    // 設定Line Messaging API的URL
    const url = "https://api.line.me/v2/bot/message/push";

    // 設定HTTP請求的Headers
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer YCuIzKhEcoY5t+5xbSoDXecEUOmZLrmjLO6eQiuAMalhzZFqtSnFF5Cm4TFpYGcrFaDE7AD2Mjkq0Bf/RIYel7IsoAgaz3rm/eWbH1lrMrFKTtJKmWvy9zNXT28ZxSqqUIr1HNV7Ar2nH1f2KuwwMQdB04t89/1O/w1cDnyilFU=",
    };

    // 構建傳送訊息的Payload
    try {
      await liff.ready.catch((reject) => {
        alert(reject.message);
      });
      const profile = await liff.getProfile();
      console.log(profile.userId);
      setCheckPro3(profile.userId);
      const data = {
        to: profile.userId,
        messages: [
          {
            type: "text",
            text: "Hello, this is a message from your OA!",
          },
        ],
      };
      // 傳送POST請求
      const res = await axios.post(`${corsAny}${url}`, data, { headers });
      // const res = await axios.post(`${url}`, data, { headers })
      console.log(res);
    } catch (error) {
      console.error(error);
      alert(error);
      setCheckPro1(error.response.statusText);
      setCheckPro2(error.response.data.message);
    }
  };

  //     const options = ['Option 1', 'Option 2', 'Option 3'];
  //     const [selectedOption, setSelectedOption] = useState('');

  //     const handleSelect = (option) => {
  //         setSelectedOption(option);
  //     };
  return (
    <>
      <input type="text" />
      <button onClick={sendChatMessage}>點我發訊息</button>
      <button
        onClick={() => {
          setCheck(!check);
          sendChatMessage();
        }}
      >
        點我檢查
      </button>
      {check && <p>有阿{`${checkPro1} AND ${checkPro2} AND ${checkPro3}`}</p>}
    </>
    //             <h1>我是首頁</h1>
    //             <h3>請點登入後用line登入</h3>
    //             <button onClick={async () => {
    //                 await liff.ready
    //                 liff.logout()
    //             }}>登出</button>
    //             {/* <Permission /> */}
    //             <form
    //             // onSubmit={hadleSubmit}
    //             >
    //                 {/* <OTPInput
    //                     value={otp}
    //                     onChange={setOtp}
    //                     numInputs={6}
    //                     renderSeparator={<span></span>}
    //                     renderInput={(props, index) => <input
    //                         {...props}
    //                         className="otp-input"
    //                         inputMode="numeric"
    //                         autoComplete="one-time-code"
    //                         pattern="\d{1}"
    //                     />}
    //                     shouldAutoFocus={true}
    //                     inputType='tel'
    //                 /> */}
    //                 <input type="submit" value="Submit" />
    //             </form>

    //             <DropdownMenu options={options} onSelect={handleSelect} />
    //             <p>You selected: {selectedOption}</p>
  );
}

export default HomePage;
