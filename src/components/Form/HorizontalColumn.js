import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import api from '@api/app'
import Validater from '@utils/Validater'

const Wrapper = styled.div`
        width: 100%;
        float: left;
        margin: 0.5rem 0 0.2rem 0;
        display: flex;
        justify-content: space-between;
        > input {
            width: 48%;
            border: 1px solid #4263CF;
            border-radius: 5px;
            display: block;
            line-height: 1.2rem;
            text-align: center;
            font-size: 0.5rem;
        }
        > input:focus {
            box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
            outline: none;
        }
        input::-webkit-input-placeholder {
            color: #D9E0F5;
        }
        input:-moz-placeholder {
            color: #D9E0F5;
        }
        input:-ms-input-placeholderr {
            color: #D9E0F5;
        }        
        > input[type=button] {
            color: white;
            border-radius: 10px;
            border-width: 0px;
            background: none;
            background-color: #6385FE;            
        }
        > input[type=button]#disabled {
            color: #D1C4E9;
            background-color: white;
            border: 1px solid #6385FE;  
        }
    `

const HorizontalColumn = (props) => {
    const COUNTDOWN_SECONDS = 5;
    const [second, setSecond] = useState(COUNTDOWN_SECONDS);
    const [timing, setTiming] = useState(false);
    const phoneNumber = props.phoneNumber;

    useEffect(() => {
        let interval;

        if(timing) {
            const retrieveVerificationCode = async () => {
                const data = await api.retrieveVerificationCode(phoneNumber);
                if(data.status === 200){
                    message.info('驗證碼已發送，請查收')
                }
            }

            retrieveVerificationCode();

            interval = setInterval(() => {
                setSecond(preSecond => {
                    if(preSecond <= 1) {
                        setTiming(false)  // ?? setVerificationCodeSent(false)
                        clearInterval(interval)
                        return COUNTDOWN_SECONDS;
                    } else {
                        return preSecond - 1;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing, phoneNumber])

    const onInputValueChange = (e) => {
        if(Validater.isVerificationCodeValid(e.target.value)){
            props.setInputValue(e.target.value)                
        }   
    }

    const onVerificationCodeBtnClick = () => {
        props.setIsVerificationCodeBtnClicked(true);
        if(!Validater.isPhoneNumberValid(phoneNumber)){ 
            props.errorCallBack();
            props.setIsTiming(false)
        } else {
            setTiming(true)
            props.setIsTiming(true)
        }
    }

    return (
        <Wrapper>
            <input placeholder="请输入验证码" onChange={onInputValueChange} value={props.value} />
            <input disabled={timing} type="button" value={timing ? `请等待 (${second})` : "获取短信验证码"} onClick={onVerificationCodeBtnClick} />
        </Wrapper>
    )
}

const areEqual = (preProps, nextProps) => {
    /**
     * 解決因為在倒計時未結束前，用戶修改phoneNumber導致PhoneNumber改變，連鎖反應導致每次改變phoneNumber都會call API的問題
     * 
     */
    if(preProps.isTiming === nextProps.isTiming && nextProps.isTiming === true && nextProps.phoneNumber !== preProps.phoneNumber) {
        return true
    } else {
        return false
    }
}

export default React.memo(HorizontalColumn, areEqual);