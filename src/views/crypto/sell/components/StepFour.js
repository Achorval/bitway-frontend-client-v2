//Success.js
import React, {Fragment, useContext, useState} from 'react';
import { FormContext } from "../index";
import request from '../../../../core/auth/request';

const API_URL = process.env.REACT_APP_API_URL;

function Preview() {
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const { activeStepIndex, setActiveStepIndex, service, formData, currentRate, address, amountToReceive, setOpenSellCrypto } = useContext(FormContext);  

  const handleSubmit = () => {
    const serviceID = service === "Bitcoin" ? 1 : 2;
    request(`${API_URL}/trade/usdt`, { method: 'POST', 
    body: {
      service: serviceID, 
      rate: currentRate,  
      imageUrl: formData.file, 
      amountToReceive: amountToReceive,
      amount: parseFloat(formData.amount) 
    }})
    .then((response) => {
      if (response.status === "Success") {
        document.location.reload();
        setDisplay(false);
      }
    })
  };

  return (
    <Fragment>
      {display ? (
        <>
        <div className="py-4 px-2" style={{background: '#F1F6FA'}}>
          <h5 className="text-uppercase text-center mb-5">Review Transaction</h5>
          <div className='heading mt-3'>
            <p>Wallet Address</p>
            <div className='subtotal'>
              {address}
            </div>
          </div>
          <div className='heading mt-3'>
            <p>Amount in Dollar</p>
            <div className='subtotal'>
              ${formData.amount}
            </div>
          </div>
          <div className='heading mt-3'>
            <p>Amount to Receive</p>
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
            setOpenSellCrypto(false);
            setActiveStepIndex(activeStepIndex - 2);
          }}>
            Back To Dashboard
          </button>
        </div>
        </>
      )}
    </Fragment>
  );
}

export default Preview;