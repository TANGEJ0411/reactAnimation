import React, { useState, useRef } from 'react';
import './test.scss';

function BasicExample({ title, content }) {
    const [array, setArray] = useState([
        { id: 1, title: '展開', content: `123456789`, isOpen: false, ref: useRef(null) },
        { id: 2, title: '展開', content: '1255555589', isOpen: false, ref: useRef(null) },
        { id: 3, title: '展開', content: '12347777777789', isOpen: false, ref: useRef(null) }
    ])
    const handleClick = (reference) => {
        const newArray = [...array];
        newArray.map((value) => {
            if (value.id === reference) {
                value.isOpen = !value.isOpen
                console.log(value.ref.current)
            }
            console.log(value.ref)
            return value
        })
        setArray(newArray)
    };
    return (
        <>
            {array.map((value) => {
                return (
                    <div className="accordion" key={value.id}>
                        <button className="accordion__button" onClick={() => {
                            handleClick(value.id)
                        }}>
                            {value.title}
                        </button>
                        <div
                            className={`accordion__content ${value.isOpen ? 'accordion__content--open' : ''}`}
                            ref={value.ref}
                            style={{ maxHeight: value.isOpen ? value.ref.current.scrollHeight + 'px' : '0', border: value.isOpen ? `1px solid black` : `0px solid black` }}
                        >
                            <div className='test'>
                                {value.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default BasicExample;