import React from 'react';
import * as Yup from 'yup';
import request from '../../../core/auth/request';
import { Link, useParams } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Header from '../../../core/menu/authHeader';

const API_URL = process.env.REACT_APP_API_URL;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #014278;
    border-bottom: solid 1px #014278;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #014278;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  newPassword: '',
  confirmPassword: ''
};

const ResetPassword = () => {
  const { token } = useParams();
 
  return (
    <div>
      <GlobalStyles/>
      <Header />
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>Reset Password</h1>
                <p>Provide your e-mail address to reset your password</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
                setSubmitting(true);
                await request(`${API_URL}/reset/password`, { 
                  method: 'POST', 
                  body: {
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                    token: token
                  }
                })
                .then((response) => {
                  resetForm();
                  setSubmitting(false);
                  setStatus({success: response.status, message: response.message});
                }).catch((err) => {
                  setSubmitting(false);
                  setStatus({success: err.response.payload.status, message: err.response.payload.message});
                });
              }}
            >
              {({ status, isSubmitting }) => { 
              return (
                <>
                {status && status.success === 'success' && (
                <div className='mb-lg-15 alert alert-success text-center'>
                  <div className='alert-text font-weight-bold'>{status.message}</div>
                </div>)}
                {status && status.success === 'error' && (
                <div className='mb-lg-15 alert alert-danger text-center'>
                  <div className='alert-text font-weight-bold'>{status.message}</div>
                </div>)}
                <Form className="form-border">
                  <div className='d-block d-sm-none mt-5'>
                    <h1>Forgot Password</h1>
                    <p>Provide your e-mail address to reset your password</p>
                  </div>
                  <div className="field-set mb-3">
                    <label>New Password</label>
                    <Field className="form-control mb-0" type="password" name="newPassword" placeholder="New Password" />
                    <ErrorMessage className='text-danger' name="newPassword" component="div" />
                  </div>
                  <div className="field-set mb-3">
                    <label>Confirm Password</label>
                    <Field className="form-control mb-0" type="password" name="confirmPassword" placeholder="Confirm Password" />
                    <ErrorMessage className='text-danger' name="confirmPassword" component="div" />
                  </div>
                  <div id='submit' className='text-center'>
                    <button
                      type='submit'
                      className='btn btn-main btn-primary color-2 w-100'
                      disabled={isSubmitting}
                    >
                      {!isSubmitting && <span className='indicator-label'>Reset Password</span>}
                      {isSubmitting && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                    <div className="clearfix"></div>
                    <div className="spacer-single"></div>
                    <Link className="text-primary" to="/auth/login">Back to Sign in</Link>
                  </div>
                </Form>
                </>
              )}}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  )
};
export default ResetPassword;