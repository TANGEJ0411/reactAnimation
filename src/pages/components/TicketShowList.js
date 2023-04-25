import React, { useState, useRef } from 'react';
import './test.scss';
import ClipboardCopy from './ClipboardCopy';


function TicketShowList({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)
    const ticListRef = useRef(null)
    const [array, setArray] = useState([
        { id: 1, title: '202301160002221-1', content: `ABC20230101202306`, isOpen: false, ref: useRef(null) },
        { id: 2, title: '202301160002221-2', content: 'ABC20230101202306', isOpen: false, ref: useRef(null) },
        { id: 3, title: '202301160002222-1', content: 'ABC20230101202306', isOpen: false, ref: useRef(null) },
        { id: 4, title: '202301160002222-2', content: 'ABC20230101202306', isOpen: false, ref: useRef(null) },
        { id: 5, title: '202301160002223-1', content: 'ABC20230101202306', isOpen: false, ref: useRef(null) },
        { id: 6, title: '202301160002223-2', content: 'ABC20230101202306', isOpen: false, ref: useRef(null) }
    ])
    const handleClick = (reference) => {
        const newArray = [...array];
        newArray.map((value) => {
            if (value.id === reference) {
                value.isOpen = !value.isOpen
                console.log(value.ref.current)
            } else {
                value.isOpen = false
            }
            return value
        })
        setArray(newArray)
    };


    return (
        <>
            <div className="accordion-parent">
                <button className="accordion__button-parent d-flex justify-content-between" onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    <p>{'票券列表'}</p>
                    <p>V</p>
                </button>
                <div
                    className={`accordion__content ${isOpen ? 'accordion__content--open' : ''}`}
                    ref={ticListRef}
                    style={{ maxHeight: isOpen ? ticListRef.current.scrollHeight + 140 + 'px' : '0' }}
                >
                    {array.map((value) => {
                        return (
                            <div className="accordion" key={value.id}>
                                <button className="accordion__button d-flex justify-content-between" onClick={() => {
                                    handleClick(value.id)
                                }}>
                                    <p>{value.title}</p>
                                    <p>V</p>
                                </button>
                                <div
                                    className={`accordion__content ${value.isOpen ? 'accordion__content--open' : ''}`}
                                    ref={value.ref}
                                    style={{ maxHeight: value.isOpen ? value.ref.current.scrollHeight + 'px' : '0' }}
                                >
                                    <div className='test'>
                                        <div className='test-box'>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <p className='test-text'>票券編號</p>
                                                <ClipboardCopy copyText={value.content} textClass={`test-text`} />
                                            </div>
                                            <div className='d-flex justify-content-between mb-3'>
                                                <p className='test-text'>核銷碼</p>
                                                <p className='test-text'>{value.content}</p>
                                            </div>
                                            <div className='test-btn-box'>
                                                <button className='test-btn'>前往訂單</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <p className='test-notice'>如有需求可點擊此處 <a className='test-notice-span'>查驗票券</a></p>
                </div>
            </div>

            {/* <ClipboardCopy /> */}
        </>
    );
}

export default TicketShowList;