import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import classnames  from "classnames";
import * as Yup from "yup";
import request from '../../core/auth/request';
import { Store } from 'react-notifications-component';

const API_URL = process.env.REACT_APP_API_URL;

const Withdrawal = ({openWithdrawal, setOpenWithdrawal}) => {
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    async function getBankAccounts() {
      return request(`${process.env.REACT_APP_API_URL}/bank/accounts`,{method: 'GET'}).then((res) => setBankAccounts(res.details));
    }
    if (openWithdrawal) {
      getBankAccounts();
    }
  }, [openWithdrawal]); 

  const withdrawalSchema = Yup.object({
    account: Yup.string()
      .required('Please Enter Account'),
    amount: Yup.string()
      .required('Please Enter Amount'),
    pin: Yup.string()
      .required('Please Enter Pin')
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits')
  });

  // ** UseForm
  const formik = useFormik({
    initialValues: {
      account: '',
      amount: '',
      pin: ''
    },
    validationSchema: withdrawalSchema,
    onSubmit: ( values, { resetForm, setSubmitting }) => {
      request(`${API_URL}/withdraw`, { 
      method: 'POST', 
      body: {
        service: 3,
        bankAccount: values.account, 
        amount: values.amount,
        pin: values.pin 
      }})
      .then((response) => {
        Store.addNotification({
          title: "Successful!",
          message: response.message,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        resetForm();
        setSubmitting(false);
        setOpenWithdrawal(false);
        document.location.reload();
      })
      .catch((error) => {
        Store.addNotification({
          title: "Error!",
          message: error.response.payload.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        setSubmitting(false);
      })
    }
  });

  return (
    <div>
    { openWithdrawal &&
      <div className='checkout'>
        <div className='maincheckout'>
          <button className='btn-close' onClick={() => setOpenWithdrawal(false)}>x</button>
          <div className='heading'>
            <h3>Withdraw</h3>
          </div>
          {/* <div className='hover-scroll-overlay-y scroll-y' style={{maxHeight:'500px'}}> */}
          <form onSubmit={formik.handleSubmit}>
            <div className='detailcheckout mb-3'>
              <div className='listcheckout'>
                <h6>Account</h6>
                <select  
                  name="account" 
                  value={formik.values.account}
                  onChange={formik.handleChange}
                  className={classnames('form-control m-0', { 'is-invalid': formik.errors.account && formik.touched.account && true })}
                >
                  <option>...Select Account...</option>
                  {bankAccounts.map(n => 
                    <option value={n.id} key={n.id}>{n.bankName +'-'+n.accountNumber}</option>  
                  )}
                </select>
                {formik.errors.account && formik.touched.account && <span className="text-danger">{formik.errors.account}</span>}
              </div>
            </div>
            <div className='detailcheckout mb-3'>
              <div className='listcheckout'>
                <h6>Amount</h6>
                <input 
                  type="text" 
                  name="amount" 
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  className={classnames('form-control m-0', { 'is-invalid': formik.errors.amount && formik.touched.amount && true })}
                />
                {formik.errors.amount && formik.touched.amount && <span className="text-danger">{formik.errors.amount}</span>}
              </div>
            </div>
            <div className='detailcheckou'>
              <div className='listcheckout'>
                <h6>Enter PIN</h6>
                <input 
                  type="password" 
                  name="pin" 
                  onBlur={formik.handleBlur}
                  value={formik.values.pin}
                  onChange={formik.handleChange}
                  className={classnames('form-control m-0', { 'is-invalid': formik.errors.pin && formik.touched.pin && true })}
                />
                {formik.errors.pin && formik.touched.pin && <span className="text-danger">{formik.errors.pin}</span>}
              </div>
            </div>
            <button type="submit" className='btn-main lead' disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Loading...' : 'Done'}
            </button>
          </form>
          {/* </div> */}
        </div>
      </div>
      }
    </div>
  );
};

export default Withdrawal;