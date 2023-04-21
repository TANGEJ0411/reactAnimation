import { Route, Routes } from "react-router-dom";
import TicketShow from "./pages/components/TicketShow";
import { BrowserRouter, Link } from "react-router-dom";
import BasicExample from "./pages/components/BasicExample";
import Modal from "./pages/components/Modal.js";
import ClipboardCopy from "./pages/components/ClipboardCopy";
import Ticket from "./pages/components/Ticket";
import liff from '@line/liff';
import React, { useEffect, useState } from "react";
import './style/globalSytle.scss'

export const isLoginContext = React.createContext()

function App() {
  const navItem = ['basicExample', 'ticket', 'modal', 'clipboardCopy']
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
    <isLoginContext.Provider value={isLoggin}>
      <div className="wrap">
        <BrowserRouter>
          <nav className="home-nav d-flex justify-content-center">
            {navItem.map((item, index) => {
              return (
                <Link to={item} key={item} className="ms-2">{item}</Link>
              )
            })}
            <button><Link to={"/login"}>登入按鈕</Link></button>
          </nav>
          <Routes>
            <Route path="/login" element={<TicketShow />} />
            <Route path="/basicExample" element={<BasicExample />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/clipboardCopy" element={<ClipboardCopy copyText={'text'} />} />
          </Routes>
        </BrowserRouter>
      </div >
    </isLoginContext.Provider>
  )
}

export default App;
