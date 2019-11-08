import React from 'react'
import styled from 'styled-components'
import success_confirm_img from './success_confirm.png'

const Mask = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.45);
`


const Modal = (props) => {
    const DOWNLOAD_LINK = 'www.baidu.com';
    const width = window.innerWidth;

    /**
     * 圖片寬高比是0.85
     */
    const SuccessImg = styled.div`
        width: ${width * 0.6}px;
        background-image: url(${success_confirm_img});
        background-size: 100% 100%;
        height: ${width * 0.6 / 0.85}px;
        :hover {
            cursor: pointer;
        }
    `

    const onModalClick = (e) => {
        console.log(e.target.id)
        const clickedElement = e.target.id
        if (clickedElement === 'backgroudMask') {
            props.setModalVisiable(false);
        }
    }

    return (
        <Mask onClick={onModalClick} id="backgroudMask">
            {/* download="expenses.pdf" */}
            <a href={DOWNLOAD_LINK}>  
                <SuccessImg id="successImg" />
            </a>
        </Mask>
    )
}

export default Modal