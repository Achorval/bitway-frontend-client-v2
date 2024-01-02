import React from 'react';
import { Link } from 'react-router-dom';

const Faqs = () => {

  return (
    <div>
      <div className="col-md-12 text-center">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className='card mb-2'>
        <div className='card-header fw-bold text-dark' data-bs-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseOne">
          How Do I Place Trade?
        </div>
        <div className="collapse" id="collapseOne">
          <div className="card-body">
            Please click <Link to="/help-center">HERE</Link> to learn how to buy and sell crypto.
          </div>
        </div>
      </div>
      <div className='card mb-2'>
        <div className='card-header fw-bold text-dark' data-bs-toggle="collapse" href="#collapseTwo" role="button" aria-expanded="false" aria-controls="collapseTwo">
          How Do I Reset My Withdrawal Pin?
        </div>
        <div className="collapse" id="collapseTwo">
          <div className="card-body">
            Please login and go to profile, then Security and then add a new Withdrawal Pin.
          </div>
        </div>
      </div>
      <div className='card mb-2'>
        <div className='card-header fw-bold text-dark' data-bs-toggle="collapse" href="#collapseThree" role="button" aria-expanded="false" aria-controls="collapseThree">
          How Do I reset my login Password?
        </div>
        <div className="collapse" id="collapseThree">
          <div className="card-body">
            Please click on the forget password link, enter your email address and check your mail for link to reset your password.
          </div>
        </div>
      </div>
      <div className='card mb-2'>
        <div className='card-header fw-bold text-dark' data-bs-toggle="collapse" href="#collapseFour" role="button" aria-expanded="false" aria-controls="collapseFour">
          Is My Fund Secured?
        </div>
        <div className="collapse" id="collapseFour">
          <div className="card-body">
            Your fund is fully secured with us and you can make withdrawal anytime.
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-header fw-bold text-dark' data-bs-toggle="collapse" href="#collapseFive" role="button" aria-expanded="false" aria-controls="collapseFive">
          How long does it take to receive an alert after making withdrawals?
        </div>
        <div className="collapse" id="collapseFive">
          <div className="card-body">
            Payment are being sent immediately you requested for it.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Faqs;