import React from 'react'
import pic from '../../image/Rectangle 372.png'
import './Ticket.scss'

function Ticket() {
    const ticketBox =
        <div className='tic-shadow'>
            <div className='ticket d-flex'>
                <div className='tic-img-box'>
                    <img src={pic} alt='房間圖片' className='tic-img' />
                </div>
                <div className='tic-dot'></div>
                <div className='tic-text-box'>
                    <h4 className='my-h3'>極上一泊二食 | ITF台北國際旅展住宿券</h4>
                    <div className='d-flex justify-content-between align-items-end'>
                        {<div className='my-t4'>逾期參閱飯店須知</div>}
                        {<button className='my-btn'>10張</button>}
                    </div>
                </div>
            </div>
        </div>
    return (
        <>
            <div className='tic-container d-md-flex justify-content-md-center'>
                {ticketBox}
                {ticketBox}
            </div>
            <div className='tic-container d-md-flex justify-content-md-center'>
                {ticketBox}
                {ticketBox}
            </div>
            <div className='tic-container d-md-flex justify-content-md-center'>
                {ticketBox}
                {ticketBox}
            </div>

        </>
    )
}

export default Ticket