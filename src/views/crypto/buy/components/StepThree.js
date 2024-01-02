// Workspace.js
import React, {useContext, useState} from "react";
import request from '../../../../core/auth/request';
import { FormContext } from "../index";

const API_URL = process.env.REACT_APP_API_URL;

function SecondStep() {
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const { activeStepIndex, setActiveStepIndex, service, formData, currentRate, amountToReceive, setOpenBuyCrypto } = useContext(FormContext);

  const handleSubmit = () => {
    const serviceID = service === "Bitcoin" ? 4 : 5;
    request(`${API_URL}/trade/bitcoin`, { 
    method: 'POST', 
    body: {
      service: serviceID, 
      rate: currentRate, 
      address: formData.walletAddress, 
      amount: parseFloat(formData.amount),
      amountToReceive: parseFloat(amountToReceive)
    }})
    .then((response) => {
      if (response.status === "success") {
        document.location.reload();
        setDisplay(false);
      }
    })
  };

  return (
    <>
    {display ? (
      <>
      <div className="p-2" style={{background: '#F1F6FA'}}>
        <div className="d-flex justify-content-center align-items-center" style={{background:'#D8EDFF',width:'46px',height:'46px',borderRadius:'50px'}}>
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </div>
        <div className='heading mt-3'>
          <p>Bank Name</p>
          <div className='subtotal'>
            Access Bank
          </div>
        </div>
        <div className='heading mt-3'>
          <p>Account Number</p>
          <div className='subtotal'>
            1635125481
          </div>
        </div>
        <div className='heading mt-3'>
          <p>Account Name</p>
          <div className='subtotal'>
            Bitway Tech
          </div>
        </div>
        <div className='heading mt-3'>
          <p>Amount in Dollar</p>
          <div className='subtotal'>
            ${formData.amount}
          </div>
        </div>
        <div className='heading mt-3'>
          <p>Amount in Naira</p>
          <div className='subtotal'>
            ₦{amountToReceive}
          </div>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn-main lead btn2" type='button' onClick={() => setActiveStepIndex(activeStepIndex - 1)}>
          Back
        </button>
        <button type="submit" className='btn-main lead' disabled={loading} onClick={() => handleSubmit()}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      </>
    ) : (
      <>
      <div className='text-center'>
        <img src="./img/svg/success.svg" alt="" className="mb-4"/>
        <h3 className='text-success'>
          Trade Submited Successfully!
        </h3>
      </div>
      <div className="py-4 px-2">
        <div className='listcheckout text-center'>
          <h6 className='mb-4'>TRANSACTION AMOUNT</h6>
          <h3>₦ {amountToReceive}</h3>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn-main lead" type="submit" onClick={() => { 
          setOpenBuyCrypto(false);
          setActiveStepIndex(activeStepIndex - 3);
        }}>
          Back To Dashboard
        </button>
      </div>
      </>
    )}
    </>
  );
}

export default SecondStep;