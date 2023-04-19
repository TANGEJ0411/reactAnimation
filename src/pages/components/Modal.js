import { useRef, useState } from 'react';
import './Modal.scss'
import React, { Component } from "react";
import Switch from "react-switch";

function Modal() {
    // 
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

    const handleTouchStart = (e) => {
        setStartDrag(true)
        dragStartX.current = parseInt(e.clientX || e.touches[0].clientX);
    }

    const handleTouchMove = (e) => {
        let position;
        if (startDrag) {
            if (e.touches[0].clientX < dragStartX.current) {
                position = 0
            } else if (e.touches[0].clientX > dragStartX.current + 300) {
                position = 300
            } else {
                position = e.touches[0].clientX - dragStartX.current
                if (position > 0) {
                    dragBoxRef.current.style.background = `linear-gradient(to right, yellow ${position}px, green 50%, red 100%)`;
                }
            }
        }
        setObjPosition(position)
        modalRef.current.style.left = `${position}px`
    }

    const handleTouchEnd = (e) => {
        setStartDrag(false)
        if (objPosition >= 200) {
            modalRef.current.style.left = `300px`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            setCheck(true)
            setObjPosition(300)
        } else {
            modalRef.current.style.left = `0px`
            setObjPosition(0)
        }
    }
    const handleMouseMove = (e) => {
        e.stopPropagation();
        let position;
        if (startDrag) {
            if (e.clientX < dragStartX.current) {
                position = 0
            } else if (e.clientX > dragStartX.current + 300) {
                position = 300
            } else {
                position = e.clientX - dragStartX.current
                if (position > 0) {
                    dragBoxRef.current.style.background = `linear-gradient(to right, yellow ${position}px, green 50%, red 100%)`;
                }
            }
        }
        setObjPosition(position)
        modalRef.current.style.left = `${position}px`
    }
    const handleMouseDown = (e) => {
        setStartDrag(true)
        dragStartX.current = parseInt(e.clientX)
    }
    const handleMouseUp = (e) => {
        setStartDrag(false)
        if (objPosition >= 200) {
            modalRef.current.style.left = `300px`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            // dragBoxRef.current.style.display = 'none'
            setCheck(true)
            setObjPosition(300)
        } else {
            modalRef.current.style.left = `0px`
            setObjPosition(0)
        }
    }
    const handleMouseOut = (e) => {
        setStartDrag(false)
        if (objPosition > 250) {
            modalRef.current.style.left = `300px`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            // dragBoxRef.current.style.display = 'none'
            setCheck(true)
            setObjPosition(300)
        } else {
            modalRef.current.style.left = `0px`
            setObjPosition(0)
        }
    }
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
                            onMouseMove={handleMouseMove}
                            onTouchMove={handleTouchMove}
                        >
                            <div className='drag-object'
                                ref={modalRef}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseOut={handleMouseOut}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
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