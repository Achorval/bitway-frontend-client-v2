import React from 'react';
import * as Yup from 'yup';
import request from '../../core/auth/request';
import { useFormik } from 'formik';
import { Store } from 'react-notifications-component';

const API_URL = process.env.REACT_APP_API_URL;

const BankAccounts= () => {
  const [openCheckout, setOpenCheckout] = React.useState(false);
  const [bankList, setBankList] = React.useState([]);
  const [bankName, setBankName] = React.useState("");
  const [bankAccounts, setBankAccounts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchBankAccounts = async () => {
    await request(`${API_URL}/bank/accounts`, { 
      method: 'GET'
    })
    .then((response) => {
      setBankAccounts(response.details);
    });
  };

  React.useEffect(() => {
    fetchBankAccounts();
  }, []);

  React.useEffect(() => {
    if (openCheckout) {
      (async () => {
        setIsLoading(true);
        await request(`${API_URL}/bank/list`, { 
          method: 'GET'
        })
        .then((response) => {
          setIsLoading(false);
          setBankList(response.details);
        });
      })();
    }
  }, [openCheckout]);

  const validationSchema = Yup.object().shape({
    bankCode: Yup.lazy(() =>
      Yup.string()
        .required('Bank is required')
    ),
    accountNumber: Yup.lazy(() =>
      Yup.string()
        .required('Account Number is required')
    ),
    accountName: Yup.lazy(() =>
      Yup.string()
        .required('Account Number is required')
    )
  });

  const initialValues = {
    bankCode: '',
    accountNumber: '',
    accountName: ''
  };

  // ** Onsubmit bank account
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm, setStatus, setSubmitting}) => {
      setSubmitting(true);
      await request(`${API_URL}/bank/account/create`, { method: 'POST', body: {
        bankName: bankName,
        accountNumber: values.accountNumber,
        accountName: values.accountName,
        bankCode: values.bankCode,
        type: 'own'
      }})
      .then((response) => {
        resetForm();
        setSubmitting(false);
        fetchBankAccounts();
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
        setOpenCheckout(false);
      }).catch((err) => {
        setSubmitting(false);
        setStatus({success: err.response.payload.status, message: err.response.payload.message});
      });
    }
  });
 
  // ** Validate Account number
  React.useEffect(() => {
    if (formik.values.bankCode && (formik.values.accountNumber.length === 10)) {
      setIsLoading(true)
      request(`${API_URL}/bank/account/verify`, { method: 'POST', body: {
        accountNumber: formik.values.accountNumber,
        bankCode: formik.values.bankCode
      }})
      .then((response) => {
        setIsLoading(false);
        formik.setFieldValue("accountName", response.details.account_name);
      }).catch((error) => {
        setIsLoading(false);
        formik.setFieldValue("accountName", "");
        formik.setStatus({ success: false, message: error.response.payload.message });
      });
    }
  }, [formik.values.bankCode, formik.values.accountNumber]);
  
  // ** Set Bank Name
  React.useEffect(() => {
    if (formik.values.bankCode) {
      var bankListArray = bankList;
      for (var i = 0; i < bankListArray.length; i++) {
        if (bankListArray[i].code === formik.values.bankCode) {
          setBankName(bankListArray[i].name);
        }
      }
    }
  }, [formik.values.bankCode]);

  return (
    <>
    <div className="d-flex align-items-center justify-content-between mb-4">
      <h1 className="d-flex text-dark fw-bolder fs-5 flex-column justify-content-center my-0">Bank Accounts</h1>
      <input type='submit' value='Add Bank' className="btn btn-main color-2" 
      onClick={() => setOpenCheckout(true)} 
      />
    </div>
    {Array.isArray(bankAccounts) && bankAccounts.length ?
      <div className='row'>
        {bankAccounts.map((value, index) => 
        <div className="col-lg-6 mb30" key={index}>
          <div className="box-url">
            <div className='d-flex align-items-center'>
              <img className='me-3' src="./img/misc/bank-1.png" height="50px" alt="" />
              <div className='flex-grow-1'>
                <h6>{value.accountName}</h6>
                <p className='mb-0'>
                  *** *** {value.accountNumber.substring(value.accountNumber.length - 4)}
                  <br />
                  {value.bankName}
                </p>
              </div>
              <input type='submit' value='Delete' className="btn btn-main color-2"/>
            </div>
          </div>
        </div>)}
      </div>
    :
      <div className="d-flex align-items-center flex-column">
        <img src="./img/misc/bank-1.png" width="300px" height="auto"/>
        <div className="fs-1 fw-bolder text-dark mb-4">No items found.</div>
        <div className="fs-6">Add your Bank Account!</div>
      </div>
    }
    
    {openCheckout &&
      <div className='checkout'>
        <div className='maincheckout'>
          <>
          <button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
          <div className='heading'>
            <h3>Add Bank Account</h3>
          </div>
          {formik.status && formik.status.success === "error" && (
            <div className='alert alert-danger text-center mb-4' role='alert'>
              {formik.status.message}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className='detailcheckout mb-2'>
              <div className='listcheckout'>
                <h6>Bank</h6>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('bankCode')}
                >
                  <option value=''>Select Bank..</option>
                  {bankList.map((value, index) => (
                    <option key={index} value={value.code}>{value.name}</option>
                  ))}
                </select>
                {formik.touched.bankCode && formik.errors.bankCode && (
                  <div className='text-danger'>{formik.errors.bankCode}</div>
                )}
              </div>
            </div>
            <div className='detailcheckou mt-2'>
              <div className='listcheckout'>
                <h6>Account Number</h6>
                <input
                  type='text'
                  placeholder='Account Number'
                  {...formik.getFieldProps('accountNumber')}
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                />
                {formik.touched.accountNumber && formik.errors.accountNumber && (
                  <div className='text-danger'>{formik.errors.accountNumber}</div>
                )}
              </div>
            </div>
            <div className='detailcheckou mt-2'>
              <div className='listcheckout'>
                <h6>Account Name</h6>
                <input
                  readOnly
                  type='text'
                  placeholder='Account Name'
                  {...formik.getFieldProps('accountName')}
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                />
                {formik.touched.accountName && formik.errors.accountName && (
                  <div className='text-danger'>{formik.errors.accountName}</div>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-main btn-primary color-2 w-100'
              disabled={formik.isSubmitting || isLoading}
            >
              <span className='indicator-label'>
                Done {formik.isSubmitting || isLoading && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
              </span>
            </button>
          </form>
          </>
        </div>
      </div>
      }
    </>
  );
}
export default BankAccounts;