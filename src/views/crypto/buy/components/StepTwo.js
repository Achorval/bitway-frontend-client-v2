// Basic.js
import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import { FormContext } from "../index";
import * as yup from "yup";
import classnames from "classnames";

const StepTwo = () => {

  const { activeStepIndex, setActiveStepIndex, currentRate, formData, setFormData, amountToReceive, setAmountToReceive } = useContext(FormContext);
  
  const ValidationSchema = yup.object().shape({
    amount: yup.string().required(),
    walletAddress: yup.string().required(),
  });

    // ** UseForm
  const formik = useFormik({
    initialValues: {
      amount: '',
      walletAddress: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: ( values ) => {
      const data = { ...formData, ...values };
      setFormData(data);
      setActiveStepIndex(activeStepIndex + 1);
    }
  });

  // trigger on component mount
  useEffect(() => {
    if (formik.values.amount !== '' && currentRate !== 0) {
      setAmountToReceive(formik.values.amount * currentRate);
    } else {
      setAmountToReceive(0);
    }
  }, [formik.values.amount, currentRate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center">
        <h4 className="bold">Transaction Details</h4>
        <p className="fw-bolder">Today’s Rate</p> 
        <span className="color fw-bold">₦{currentRate}/USD</span>
      </div>
      <div className='detailcheckout mb-3'>
        <div className='listcheckout'>
          <h6>Amount in Dollar ($)</h6>
          <input 
            type="text" 
            name="amount" 
            placeholder="Amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            className={classnames('form-control mb-1', { 'is-invalid': formik.errors.amount && formik.touched.amount && true })}
          />
          {formik.errors.amount && formik.touched.amount && <span className="text-danger">{formik.errors.amount}</span>}
        </div>
      </div>
      <div className='detailcheckout mb-3'>
        <div className='listcheckout'>
          <h6>Receiving Wallet Address</h6>
          <input 
            type="text" 
            name="walletAddress" 
            placeholder="Wallet Address"
            value={formik.values.walletAddress}
            onChange={formik.handleChange}
            className={classnames('form-control mb-1', { 'is-invalid': formik.errors.walletAddress && formik.touched.walletAddress && true })}
          />
          {formik.errors.walletAddress && formik.touched.walletAddress && <span className="text-danger">{formik.errors.walletAddress}</span>}
        </div>
      </div>
      <button type="submit" className='btn-main lead'>
        Continue
      </button>
    </form>
  );
}

export default StepTwo;
