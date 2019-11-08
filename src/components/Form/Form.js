import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import VerticalColumn from './VerticalColumn'
import HorizontalColumn from './HorizontalColumn'
import { message } from 'antd';
// import AppContext from '@context/AppContext'
import { Modal } from '@components/Modal';
import Validater from '@utils/Validater';
import api from '@api/app';

const FormGroups = styled.div`
    width: 80%;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 1rem;
    padding: 0.6rem 0;
    padding-bottom: 0.8rem;
    > div {
        text-align: left;
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
    }
`

const Wrapper = styled.div`
    margin-top: 1.2rem;
    > input[type=button] {
        width: 60%;
        color: white;
        border-radius: 20px;
        border: 1px solid white;
        background: none;
        background-color: #6385FE;
        font-size: 0.8rem;
        line-height: 1.5rem;
    }
    > span {
        display: block;
        margin-top: 0.1rem;
        color: #D1C4E9;
        font-size: 0.6rem;
    }
`

const Form = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginPwd, setLoginPwd] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [isTiming, setIsTiming] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isVerificationCodeBtnClicked, setIsVerificationCodeBtnClicked] = useState(false)
    const [modalVisiable, setModalVisiable] = useState(false)
    const phoneNumberRef = React.createRef();
    const setIsSpining = props.setIsSpining
    /**
     * Reserve for Context trying
     * 
     */
    // const appData = useContext(AppContext);
    // console.log('appData', appData)

    const errorOnRetrieveVerificationCode = () => {
        setPhoneNumber('')
        phoneNumberRef.current.focus();
        message.error('請輸入正確的手機號碼')
        return false;
    }

    const handleSubmitBtnClick = () => {
        if (!isVerificationCodeBtnClicked || (isVerificationCodeBtnClicked && !Validater.isPhoneNumberValid(phoneNumber))) {
            message.info('請獲取驗證碼')
            return
        }
        const isValid = Validater.isFormValid(phoneNumber, verificationCode, loginPwd);
        if (isValid) {
            setIsFormValid(true);
            setModalVisiable(true);
            console.log('valid')
        } else {
            setIsFormValid(false);
            message.error('请输入密码，包含数字且至少含有一个大写、一个小写字母')
        }
    }

    useEffect(() => {
        if (isFormValid) {
            const postFormData = async () => {
                const resData = await api.submitFormData(phoneNumber, verificationCode, loginPwd);
                console.log('resData', resData)
                if(resData.status === 201 || resData.status === 200){
                    setModalVisiable(true)
                }
                setIsSpining(false)
            }
            setIsSpining(true)
            postFormData()
            
        }
    }, [phoneNumber, verificationCode, loginPwd, isFormValid, setIsSpining])

    console.log('modalVisiable', modalVisiable)

    return (
        <div>
            { modalVisiable ? <Modal currentVisiable={modalVisiable} setModalVisiable={setModalVisiable} /> : null }
            <FormGroups>
                <div>
                    <VerticalColumn ref={phoneNumberRef} label="请输入手机号" setInputValue={setPhoneNumber} value={phoneNumber} type="number" />
                    <HorizontalColumn
                        setIsVerificationCodeBtnClicked={setIsVerificationCodeBtnClicked}
                        errorCallBack={errorOnRetrieveVerificationCode}
                        phoneNumber={phoneNumber}
                        setIsTiming={setIsTiming}
                        isTiming={isTiming}
                        setInputValue={setVerificationCode}
                        value={verificationCode}
                    />
                    <VerticalColumn label="设置登录密码" setInputValue={setLoginPwd} value={loginPwd} type="loginPwd" />
                </div>
            </FormGroups>
            <Wrapper>
                <input type='button' value="立即领取" onClick={handleSubmitBtnClick} />
                <span>福利有限，领完即活动终止</span>
            </Wrapper>
        </div>
    )
}

export default Form;