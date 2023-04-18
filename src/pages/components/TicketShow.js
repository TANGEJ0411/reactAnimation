import React from 'react'
import { Link } from 'react-router-dom'
import './TicketShow.scss'

function TicketShow(props) {
    return (
        <div className='d-md-flex justify-content-md-center'>
            <widget type="ticket" class="m-2">
                <div class="top">
                    <div class="bandname -bold">Ghost Mice</div>
                    <div class="tourname">Home Tour</div>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="" />
                    <div class="deetz">
                        <div class="event">
                            <div class="date">3rd March 2017</div>
                            <div class="location -bold">Bloomington, Indiana</div>
                        </div>
                        <div class="price">
                            <div class="label">Price</div>
                            <div class="cost -bold">$30</div>
                        </div>
                    </div>
                </div>
                <div class="rip"></div>
                <div class="bottom">
                    {/* <div class="barcode"></div> */}
                    <a class="buy" href="#">BUY TICKET</a>
                </div>
            </widget>
            <widget type="ticket" class="m-2">
                <div class="top">
                    <div class="bandname -bold">Ghost Mice</div>
                    <div class="tourname">Home Tour</div>
                    <div class="deetz">
                        <div class="event">
                            <div class="date">3rd March 2017</div>
                            <div class="location -bold">Bloomington, Indiana</div>
                        </div>
                        <div class="price">
                            <div class="label">Price</div>
                            <div class="cost -bold">$30</div>
                        </div>
                    </div>
                </div>
                <div class="rip"></div>
                <div class="bottom">
                    {/* <div class="barcode" style={{ height: '30px' }}></div> */}
                    <a class="buy" href="#">掃描</a>
                </div>
            </widget>
        </div>
    )
}


export default TicketShow
