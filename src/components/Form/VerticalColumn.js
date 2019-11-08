import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    float: left;
    > label {
        font-size: 0.6rem;
        display: block;
        color: #4263CF;
        margin-bottom: 0.1rem;
    }
    > input {
        width: 98%;
        border: 1px solid #4263CF;
        border-radius: 5px;
        display: block;
        line-height: 1.2rem;
        text-align: center;
        font-size: 0.5rem;
    }
    > input:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
    }
`



const VerticalColumn = React.forwardRef((props, ref) => {

    const onInputValueChange = (e) => {
        if(props.type === 'number') {
            const numericRegx = /^\d*$/;
            if(e.target.value.match(numericRegx)){
                props.setInputValue(e.target.value)                
            }
            return
        }
        props.setInputValue(e.target.value)        
    }

    return (
        <Wrapper >
            <label>{props.label}</label>
            <input ref={ref} onChange={onInputValueChange} value={props.value} />
            {/* type={props.type === 'loginPwd' ? 'password' : 'text'} */}
        </Wrapper>
    )
})

export default VerticalColumn;