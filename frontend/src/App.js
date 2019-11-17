import React from 'react';
import classes from './app.module.scss';
import axios from 'axios';

const App = () => {
  const handlePay = async () => {
    const result = await axios.post('http://localhost:5000/pay');
    console.log(result);
  };

  return (
    <div className={classes.app}>
      <div>
        <h1>Learn React</h1>
        <h2>Buy for $49.95</h2>
      </div>
      <div className={classes.btn} onClick={handlePay}>
        Buy Now
      </div>
    </div>
  );
};

export default App;
