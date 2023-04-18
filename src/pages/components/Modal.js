import { useRef, useState } from 'react';
import './Modal.scss'
import React, { Component } from "react";
import Switch from "react-switch";

function Modal() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true)

    };
    const handleCloseModal = () => setShowModal(false);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseModal();
        }
    };


    const modalRef = useRef(null)
    const dragBoxRef = useRef(null)
    const [objPosition, setObjPosition] = useState(0)
    const [startDrag, setStartDrag] = useState(false)
    const [check, setCheck] = useState(false)
    const dragStartX = useRef(0)
    return (
        <>
            <button onClick={handleOpenModal}>Open Modal</button>
            {showModal && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className='inner-box'>
                        <button className="modal-close" onClick={handleCloseModal}>
                            X
                        </button>
                        <h2 className=''>Modal Title</h2>
                        <p>Modal content goes here</p>

                        <div className='drag-box'
                            ref={dragBoxRef}
                            onMouseMove={(e) => {
                                let position;
                                if (startDrag) {
                                    if (e.clientX < dragStartX.current) {
                                        position = 0
                                    } else if (e.clientX > dragStartX.current + 300) {
                                        position = 300
                                    } else {
                                        position = e.clientX - dragStartX.current
                                    }
                                }
                                setObjPosition(position)
                                modalRef.current.style.left = `${position}px`
                            }}
                        >
                            <div className='drag-object'
                                ref={modalRef}
                                onMouseDown={(e) => {
                                    setStartDrag(true)
                                    dragStartX.current = parseInt(e.clientX)
                                }}
                                onMouseUp={(e) => {
                                    setStartDrag(false)
                                    if (objPosition > 200) {
                                        modalRef.current.style.left = `300px`
                                        dragBoxRef.current.style.opacity = '0'
                                        dragBoxRef.current.style.height = '0'
                                        // dragBoxRef.current.style.display = 'none'
                                        setTimeout(setCheck(true), 1000)
                                    } else {
                                        modalRef.current.style.left = `0px`
                                    }
                                }}
                            >
                            </div>
                        </div>
                        {check && <h2>您已成功確認</h2>}
                    </div>
                </div >
            )
            }
        </>
    );
}

export default Modal;