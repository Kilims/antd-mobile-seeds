import React from 'react';
import './App.css';
import HelloWorld from '@component/HelloWorld'
import { Button, WingBlank } from 'antd-mobile';


function App() {
  return (
    <WingBlank>
      <Button type="primary">
        Clike Me
      </Button>
      <HelloWorld />
    </WingBlank>
  );
}

export default App;
