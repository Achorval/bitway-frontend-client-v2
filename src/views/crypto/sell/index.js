import React, { useState, createContext } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from './components/StepFour';

export const FormContext = createContext();

const SellCrypto = ({openSellCrypto, setOpenSellCrypto}) => {
  const [service, setService] = useState('Crypto');
  const [currentRate, setCurrentSetRate] = useState(0);
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const address = service === "Bitcoin" ? "3FUq8ZbTvTCiU2KWhENDv15mwzFhtnEuV2" : "TW3afMxcXFPAaTQwpwvugEi86eSPLsFUNr";

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
      case 3:
        return (
          <StepFour />
        )
        break;
      default:
        break;
    }
  }

  return (
    <div>{openSellCrypto &&
      <div className='checkout'>
        <div className='maincheckout'>
          <button className='btn-close' onClick={() => {
            setActiveStepIndex(0); 
            setOpenSellCrypto(false);
          }}>x</button>
          <div className='heading'>
            <h3>Sell {service}</h3>
          </div>
          <FormContext.Provider
            value={{ activeStepIndex, setActiveStepIndex, formData, service, setService, setFormData, address, setOpenSellCrypto, currentRate, setCurrentSetRate, amountToReceive, setAmountToReceive }}
          >
            {RenderStep()}
          </FormContext.Provider>
        </div>
      </div>
    }</div>
  );
};

export default SellCrypto;