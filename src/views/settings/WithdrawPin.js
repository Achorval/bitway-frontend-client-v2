import React from 'react';
import * as Yup from 'yup';
import request from '../../core/auth/request';
import { Store } from 'react-notifications-component';
import { useFormik } from 'formik';

const API_URL = process.env.REACT_APP_API_URL;

const WithdrawalPin= () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [openCheckout, setOpenCheckout] = React.useState(false);

  const validationSchema = Yup.object().shape({
    pin: Yup.lazy(() =>
      Yup.string()
        .required('Pin is required')
    ),
    password: Yup.lazy(() =>
      Yup.string()
        .required('Password Number is required')
    )
  });

  const initialValues = {
    pin: '',
    password: ''
  };

  // ** Onsubmit bank account
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm, setStatus, setSubmitting}) => {
      setIsLoading(true);
      await request(`${API_URL}/security/pin`, { method: 'POST', body: {
        pin: values.pin,
        password: values.password
      }})
      .then((response) => {
        setIsLoading(false);
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
        setOpenCheckout(false);
      }).catch((err) => {
        setIsLoading(false);
        Store.addNotification({
          title: "Successful!",
          message: err.response.payload.message,
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
      });
    }
  });

  return (
    <>
      <div className='card h-100'>
        <div className='card-header'>Withdrawal PIN</div>
        <div className='card-body'>
          <p className="py-2">Manage your withdrawal PIN</p>
          <div className='text-center'>
            <img src="./img/general/security.svg" alt="" className="mb20"/>
            <div className="py-3">Set your withdrawal PIN here</div>
          </div>
        </div>
        <div className='card-footer'>
          <input type="button" id="submit" className="btn-main w-100" value="Set Withdrawal PIN" onClick={() => setOpenCheckout(true)} />
        </div>
      </div>
      {openCheckout &&
      <div className='checkout'>
        <div className='alert'>herer</div>
        <div className='maincheckout'>
          <button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
          <form onSubmit={formik.handleSubmit}>
            <div className="text-center">
              <h4 className="bold">Set your withdrawal PIN</h4>
              <p className="fw-bolder">For extra security, you'll need to set a withdrawal pin</p>
            </div>
            {/* {formik.status && formik.status.success === "success" && (
              <div className='alert alert-success text-center mb-4' role='alert'>
                {formik.status.message}
              </div>
            )} */}
            {formik.status && formik.status.success === "error" && (
              <div className='alert alert-danger text-center mb-4' role='alert'>
                {formik.status.message}
              </div>
            )}
            <div className='detailcheckout'>
              <div className='listcheckout mb-3'>
                <h6>Pin</h6>
                <input
                  type='password'
                  placeholder='Pin'
                  {...formik.getFieldProps('pin')}
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                />
                {formik.touched.pin && formik.errors.pin && (
                  <div className='text-danger'>{formik.errors.pin}</div>
                )}
              </div>
            </div>
            <div className='detailcheckou'>
              <div className='listcheckout'>
                <h6>Current Password</h6>
                <input
                  type='password'
                  placeholder='Password'
                  {...formik.getFieldProps('password')}
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                />
                {formik.touched.password && formik.errors.password && (
                  <div className='text-danger'>{formik.errors.password}</div>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-main btn-primary color-2 w-100'
              disabled={isLoading}
            >
              {!isLoading && <span className='indicator-label'>Done</span>}
              {isLoading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>}
    </>
  );
}
export default WithdrawalPin;