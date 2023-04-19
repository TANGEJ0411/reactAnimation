import { Route, Routes } from "react-router-dom";
import TicketShow from "./pages/components/TicketShow";
import { BrowserRouter } from "react-router-dom";
import BasicExample from "./pages/components/BasicExample";
import Modal from "./pages/components/Modal.js";
import ClipboardCopy from "./pages/components/ClipboardCopy";
import Ticket from "./pages/components/Ticket";


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route  element={<TicketShow />} />
    //   </Routes>
    // </BrowserRouter>
    <div className="wrap">
      <TicketShow />
      <BasicExample />
      <Ticket />
      <Modal />
      <ClipboardCopy copyText={'text'} />
      {/* <TicketShow /> */}
    </div>
  )
}

export default App;
