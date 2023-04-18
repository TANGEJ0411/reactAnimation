import { Route, Routes } from "react-router-dom";
import TicketShow from "./pages/components/TicketShow";
import { BrowserRouter } from "react-router-dom";
import BasicExample from "./pages/components/BasicExample";
import Modal from "./pages/components/Modal.js";
import ClipboardCopy from "./pages/components/ClipboardCopy";


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route  element={<TicketShow />} />
    //   </Routes>
    // </BrowserRouter>
    <>
      <TicketShow />
      <BasicExample />
      <Modal />
      <ClipboardCopy copyText={'text'} />
      {/* <TicketShow /> */}
    </>
  )
}

export default App;
