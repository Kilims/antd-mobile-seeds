import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components'
import bgImag from './easyLoan_blank.png'
import * as FormGroup from '@components/Form'
import CountUp from 'react-countup';
import api from './services/app'
import { Spin } from 'antd';

const App = props => {
  const [remainTickets, setRemainTickets] = useState(10000)
  const [isSpining, setIsSpining] = useState(false)
  const size = useWindowSize();
  const ratedHeight = size.width / 0.56
  /**
   * 背景图源图片 
   * width: 1242
   * height: 2208
   * 宽高比为 widht ： height 为：0.5625
   */

  const Wrapper = styled.div`
    width: 100%;
    background-image: url(${bgImag});  
    background-size: 100% 100%;
    /**
    *  对应源图片宽高比设置高后，如果仍然比设备屏幕高度小，则直接使用设备高度
    */
    min-height: ${ratedHeight > size.height ? ratedHeight : size.height}px;
    text-align: center;
    
  `

  const RemainingTicket = styled.div`
    /**
      两种情况： 
        如果在源图片比例内，则使用比例内应当出现文字时的高度:宽度，经测得比值1.31，即宽度 / 1.31为应当开始html代码的高度
        如果在源图片比例外，即拉长型背景，则用测得比例0.43
    
    */
    padding-top: ${ratedHeight > size.height ? size.width / 1.31 : size.height * 0.43}px;    
    color: white;
    font-size: 0.6rem;
  `

  const CustSpinner = styled(Spin)`
    max-height: none !important;
  `

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getRemainTickets();
      setRemainTickets(result.data.remainingTickets);
    }
    if (remainTickets === 10000) {
      fetchData();
    }
  })

  return (
    <CustSpinner tip="loading..." spinning={isSpining} onClick={() => setIsSpining(false)}>
      <Wrapper>
        <RemainingTicket>当前仅剩 <CountUp start={10000} end={parseInt(remainTickets)} duration={3} delay={0.2} /> 张</RemainingTicket>
        <FormGroup.Form setIsSpining={setIsSpining} />
      </Wrapper>
    </CustSpinner>
  );
}

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
      // or use : window.screen.availWidth / window.screen.availHeight
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return false;

    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getSize])

  return windowSize

}


export default App;
