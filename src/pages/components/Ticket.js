import React from 'react'
import pic from '../../image/Rectangle 372.png'
import './Ticket.scss'

function Ticket({ }) {
    const ticketBox =
        <div className='tic-shadow mx-auto mx-md-2'>
            <div className='ticket d-flex my-2'>
                <div className='tic-img-box'>
                    <img src={pic} loading="lazy" alt='房間圖片' className='tic-img' />
                </div>
                <div className='tic-dot'></div>
                <div className='tic-text-box p-2'>
                    <h4 className='my-h3'>極上一泊二食 | ITF台北國際旅展住宿券</h4>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        {<div className='my-t4'>逾期辦法以飯店公告為主</div>}
                        {<button className='my-btn'>10張</button>}
                    </div>
                </div>
            </div>
        </div>
    return (
        <>
            <div className='d-md-flex justify-content-md-center mb-1'>
                {ticketBox}
                {ticketBox}
            </div>
            <div className='d-md-flex justify-content-md-center mb-1'>
                {ticketBox}
                {ticketBox}
            </div>
            <div className='d-md-flex justify-content-md-center mb-1'>
                {ticketBox}
                {ticketBox}
            </div>

        </>
    )
}

export default Ticket