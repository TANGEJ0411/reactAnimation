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

export const isLoginContext = React.createContext()

function App() {
  const navItem = ['/', 'basicExample', 'ticket', 'modal', 'clipboardCopy']
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
            <nav className="home-nav d-flex justify-content-center position-sticky bottom-0">
              {navItem.map((item, index) => {
                let title
                switch (item) {
                  case "/":
                    title = '首頁'
                    break;
                  case 'basicExample':
                    title = 'basicExample'
                    break;
                  case 'ticket':
                    title = 'ticket'
                    break;
                  case 'modal':
                    title = 'modal'
                    break
                  case 'clipboardCopy':
                    title = 'clipboardCopy'
                    break
                  default:
                }
                return (
                  <Link to={item} key={item} className="ms-2">{title}</Link>
                )
              })}
              <button><Link to={"/login"}>登入</Link></button>
            </nav>
          </div >
        </isLoginContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
