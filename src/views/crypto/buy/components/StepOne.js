import React, { useContext, Fragment } from "react";
import { FormContext } from "../index";
import request from '../../../../core/auth/request';

const API_URL = process.env.REACT_APP_API_URL;

const StepOne = () => {
  const { activeStepIndex, setActiveStepIndex, setService, setCurrentSetRate } = useContext(FormContext);
  
  const fetchUsdtRate = async () => {
    await request(`${API_URL}/service`, { 
      method: 'GET', 
      params: {
        slug: 'buy-usdt'
      }
    })
    .then((response) => {
      setCurrentSetRate(response.details.rate);
    }).catch((err) => {
      
    });
  };

  const fetchBitcoinRate = async () => {
    await request(`${API_URL}/service`, { 
      method: 'GET', 
      params: {
        slug: 'buy-bitcoin'
      }
    })
    .then((response) => {
      setCurrentSetRate(response.details.rate);
    }).catch((err) => {
      
    });
  };

  return (
    <Fragment>
      <button className="opt-create" onClick={() => {
        fetchBitcoinRate();
        setService('Bitcoin');
        setActiveStepIndex(activeStepIndex + 1);
      }}>
        <img src="./img/misc/bitcoin.png" alt="" />
        <h3>Buy Bitcoin</h3>
      </button>
      <button className="opt-create" onClick={() => {
        fetchUsdtRate();
        setService('USDT');
        setActiveStepIndex(activeStepIndex + 1);
      }}>
        <img src="./img/misc/usdt.png" alt="" />
        <h3>Buy USDT</h3>
      </button>
    </Fragment>
  );
};

export default StepOne;