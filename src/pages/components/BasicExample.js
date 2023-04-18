import React, { useState, useRef } from 'react';
import './test.scss';
import ClipboardJS from "clipboard"

function BasicExample({ title, content }) {
    const [array, setArray] = useState([
        { id: 1, title: '展開', content: `123456789`, isOpen: false, ref: useRef(null) },
        { id: 2, title: '展開', content: '1255555589', isOpen: false, ref: useRef(null) },
        { id: 3, title: '展開', content: '123477888888888877777789', isOpen: false, ref: useRef(null) },
        { id: 4, title: '展開', content: '12347779999999997777789', isOpen: false, ref: useRef(null) },
        { id: 5, title: '展開', content: '12347777000000000777789', isOpen: false, ref: useRef(null) },
        { id: 6, title: '展開', content: '123477777777777777777789', isOpen: false, ref: useRef(null) }
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

    const clipboard = new ClipboardJS('.btn-copy');
    clipboard.on('success', function (e) {

        alert(`複製成功`)

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
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
            <input id="foo" value="https://github.com/zenorocha/clipboard.js.git" readOnly />
            <button className="btn-copy" data-clipboard-target="#foo">
                複製
            </button>
        </>
    );
}

export default BasicExample;