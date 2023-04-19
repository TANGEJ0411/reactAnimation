import { Route, Routes } from "react-router-dom";
import TicketShow from "./pages/components/TicketShow";
import { BrowserRouter, Link } from "react-router-dom";
import BasicExample from "./pages/components/BasicExample";
import Modal from "./pages/components/Modal.js";
import ClipboardCopy from "./pages/components/ClipboardCopy";
import Ticket from "./pages/components/Ticket";


function App() {
  const navItem = ['ticketShow', 'basicExample', 'ticket', 'modal', 'clipboardCopy']
  return (
    <BrowserRouter>
      <div className="wrap">
        {navItem.map((item, index) => {
          return (
            <Link to={item} key={item} className="mx-3">{item}</Link>
          )
        })}
        <Routes>
          <Route path="/ticketShow" element={<TicketShow />} />
          <Route path="/basicExample" element={<BasicExample />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/clipboardCopy" element={<ClipboardCopy copyText={'text'} />} />
        </Routes>
      </div >
    </BrowserRouter>
  )
}

export default App;
