// Basic.js
import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import { FormContext } from "../index";
import * as yup from "yup";
import classnames from "classnames";

const StepOne = () => {
  const { activeStepIndex, setActiveStepIndex, currentRate, formData, setFormData, amountToReceive, setAmountToReceive } = useContext(FormContext);
  
  const ValidationSchema = yup.object().shape({
    amount: yup.string().required()
  });

    // ** UseForm
  const formik = useFormik({
    initialValues: {
      amount: ''
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
      <div className='detailcheckout mb-5'>
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
      <div className='detailcheckou'>
        <div className='listcheckout text-center'>
          <h6>AMOUNT TO BE RECEIVED</h6>
          <h3>₦ {amountToReceive}</h3>
        </div>
      </div>
      <button type="submit" className='btn-main lead'>
        Continue
      </button>
    </form>
  );
}

export default StepOne;
