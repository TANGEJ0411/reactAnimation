import { useRef, useState } from 'react';
import './Modal.scss'
import React, { Component } from "react";
import Switch from "react-switch";
import Ticket from './Ticket';

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

    //綁定要被拖拉的DOM
    const modalRef = useRef(null)
    //綁定被拖拉的區域的DOM
    const dragBoxRef = useRef(null)
    //設定觸發初始值藉以計算移動距離，但改變時不觸發rerender所以用ref裝
    const dragStartX = useRef(0)
    //控制被拖拉的DOM物件的移動距離，預設為左邊
    const [objPosition, setObjPosition] = useState(0)
    //按下滑鼠或點擊後開始可以移動
    const [startDrag, setStartDrag] = useState(false)
    //滑到底時認證完成的狀態
    const [check, setCheck] = useState(false)
    //紀錄當前滑動區域的範圍width，需要觸發rerender
    const [dragWidth, setDragWidth] = useState(0)


    //以下為控制mouse 或 touch 事件的

    //點擊開始
    const handleTouchStart = (e) => {
        setStartDrag(true)
        setDragWidth(dragBoxRef.current.scrollWidth - 50)
        dragStartX.current = parseInt(e.clientX || e.touches[0].clientX);
    }

    const handleTouchMove = (e) => {
        let position;
        if (startDrag) {
            if (e.touches[0].clientX < dragStartX.current) {
                position = 0
            } else if (e.touches[0].clientX > dragStartX.current + dragWidth) {
                position = dragWidth
            } else {
                position = e.touches[0].clientX - dragStartX.current
                console.log(dragBoxRef.current.scrollWidth)
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
        if (objPosition >= dragWidth - 50) {
            modalRef.current.style.left = `${dragWidth}px`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            setCheck(true)
            setObjPosition(dragWidth)
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
            } else if (e.clientX > dragStartX.current + dragWidth) {
                position = dragWidth
            } else {
                position = e.clientX - dragStartX.current
                console.log(dragBoxRef.current.scrollWidth)
                if (position > 0) {
                    dragBoxRef.current.style.background = `linear-gradient(to right, yellow ${position}px, green 50%, red 100%)`;
                }
            }
        }
        setObjPosition(position)
        modalRef.current.style.left = `${position}px`
    }
    const handleMouseDown = (e) => {
        setDragWidth(dragBoxRef.current.scrollWidth - 50)
        setStartDrag(true)
        dragStartX.current = parseInt(e.clientX)
    }
    const handleMouseUp = (e) => {
        setStartDrag(false)
        if (objPosition >= dragWidth - 50) {
            modalRef.current.style.left = `${dragWidth}px`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            setCheck(true)
            setObjPosition(dragWidth)
        } else {
            modalRef.current.style.left = `0px`
            setObjPosition(0)
        }
    }
    const handleMouseOut = (e) => {
        setStartDrag(false)
        if (objPosition > dragWidth - 50) {
            modalRef.current.style.left = `dragWidthpx`
            dragBoxRef.current.style.opacity = '0'
            dragBoxRef.current.style.height = '0'
            setCheck(true)
            setObjPosition(dragWidth)
        } else {
            modalRef.current.style.left = `0px`
            setObjPosition(0)
        }
    }
    return (
        <>
            <Ticket />
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
                        {check && <h2>您已成功確認您已成功確認</h2>}
                    </div>
                </div >
            )
            }
        </>
    );
}

export default Modal;