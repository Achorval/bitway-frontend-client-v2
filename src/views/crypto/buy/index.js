import React, { useState, createContext } from "react";
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';

export const FormContext = createContext();

const BuyBitcoin = ({openBuyCrypto, setOpenBuyCrypto}) => {
  const [service, setService] = useState('Crypto');
  const [currentRate, setCurrentSetRate] = useState(0);
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const address = 'TFG6V6QNYXaPzYKNug6FC54iwnXzxqk5Xn';
  
  const RenderStep = () => {
    switch (activeStepIndex) {
      case 0:
        return (
          <StepOne />
        )
        break;
      case 1:
        return (
          <StepTwo />
        )
        break;
      case 2:
        return (
          <StepThree />
        )
        break;
      default:
        break;
    }
  };

  return (
    <div>
    { openBuyCrypto &&
      <div className='checkout'>
        <div className='maincheckout'>
          <button className='btn-close' onClick={() => {
            setActiveStepIndex(0); 
            setOpenBuyCrypto(false);
          }}>x</button>
          <div className='heading'>
            <h3>Buy {service}</h3>
          </div>
          {/* <FormContext.Provider
            value={{ activeStepIndex, setActiveStepIndex, formData, service, setService, setFormData, address, setOpenBuyCrypto, currentRate, setCurrentSetRate, amountToReceive, setAmountToReceive }}
          >
            {RenderStep()}
          </FormContext.Provider> */}
          <h1 className="text-center">Coming Soon</h1>
        </div>
      </div>
      }
    </div>
  );
};

export default BuyBitcoin;