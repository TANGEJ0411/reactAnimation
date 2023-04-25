import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import liff from '@line/liff';

import TicketShow from "./pages/components/TicketShow";
import BasicExample from "./pages/components/BasicExample";
import Modal from "./pages/components/Modal.js";
import ClipboardCopy from "./pages/components/ClipboardCopy";
import Ticket from "./pages/components/Ticket";
import AddFriend from "./pages/components/AddFriend";
import './style/globalSytle.scss'
import HomePage from "./pages/components/HomePage";
import filterIcon from './image/filter-icon.svg'
import member from './image/member.svg'
import trip from './image/trip.svg'
import tic from './image/tic.svg'
import shop from './image/shop.svg'
import message from './image/message.svg'

export const isLoginContext = React.createContext()

function App() {
  const navItem = ['/', 'basicExample', 'ticket', 'modal', 'login']
  const [isLoggin, setIsLoggin] = useState(false)
  useEffect(() => {
    async function liffInit() {
      try {
        await liff.init({
          liffId: "1660858533-loqWyNQE", // Use own liffId
        })
        console.log('init success')
        setIsLoggin(liff.isLoggedIn())
      } catch (error) {
        console.log(error)
      }
    }
    liffInit()
  }, [])
  return (
    <>
      <BrowserRouter>
        <isLoginContext.Provider value={isLoggin}>
          <div className="wrap">
            <nav className="nav-header position-sticky top-0">
              <div className="position-relative p-2">
                <div className="text-center my-h2-mb">我的票夾</div>
                <h6 className="transfer-btn">轉贈票券</h6>
              </div>
              <div className="d-flex mt-1">
                <h5 className="flex-fill text-center voucher">預約券</h5>
                <h5 className="flex-fill text-center coupon">即享券</h5>
              </div>
            </nav>
            <div className="d-flex justify-content-between">
              <div className="state-box">
                <button className="state-avaliable">可使用</button>
                <button className="state-unavaliable">已使用/失效/轉贈</button>
              </div>
              <div className="d-flex filter-btn">
                <img src={filterIcon} alt="篩選圖案" className="align-self-center" />
                <p className="filter-text align-self-center">篩選</p>
              </div>
            </div>
            <div className="my-contain">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<TicketShow />} />
                <Route path="/basicExample" element={<BasicExample />} />
                <Route path="/ticket" element={<Ticket />}>
                  <Route index element={<Ticket />} />
                  {/* <Route path="/voucher" element={<Ticket />} />
                <Route path="/coupon" element={<Ticket />} /> */}
                </Route>
                <Route path="/modal" element={<Modal />} />
                <Route path="/clipboardCopy" element={<ClipboardCopy copyText={'text'} />} />
                <Route path="/addFriend" element={<AddFriend />} />
              </Routes>
              <p className="text-center">已經到底囉^_^</p>
            </div>
            <nav className="home-nav d-flex justify-content-around position-sticky bottom-0">
              {navItem.map((item, index) => {
                let title
                let src;
                switch (item) {
                  case "/":
                    title = '票券'
                    src = tic;
                    break;
                  case 'basicExample':
                    title = '行程'
                    src = trip
                    break;
                  case 'ticket':
                    title = '商店'
                    src = shop
                    break;
                  case 'modal':
                    title = '通知'
                    src = message
                    break
                  case 'login':
                    title = '會員'
                    src = member
                    break
                  default:
                }
                return (
                  <Link to={item} key={item} className="d-block link-text">
                    <li className="navfoo-link-box">
                      <img src={src} alt={title} className="link-icon" />
                      <p>{title}</p>
                    </li>
                  </Link>
                )
              })}
              {/* <button><Link to={"/login"}>登入</Link></button> */}
            </nav>
          </div >
        </isLoginContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
