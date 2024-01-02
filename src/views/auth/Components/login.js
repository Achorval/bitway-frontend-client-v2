import React from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../../core/utils/useAuth';
import authHelper from '../../../core/utils/AuthHelpers';
import request from '../../../core/auth/request';
import { createGlobalStyle } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Header from '../../../core/menu/authHeader';
import { getUserBalance } from '../../../core/utils/helpers';

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
  username: Yup.lazy(() =>
    Yup.string()
      .required('Email of Phone is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required('Password is required')
  )
});

const initialValues = {
  username: '',
  password: ''
};

const Login = () => {
  const {setCurrentAdmin, setBalance} = useAuth();
  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  return (
    <div>
      <GlobalStyles/>
      <Header />
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                  <h1>User Login</h1>
                  <p>Sign in to your account</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container'>
        <div className="row">
          <div className="col-md-12 text-center d-block d-sm-none mt-5">
            <h1>User Login</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="col-md-6 offset-md-3">
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
                setSubmitting(true);
                await request(`${API_URL}/login`, { 
                  method: 'POST', 
                  body: values
                })
                .then(async (response) => {
                  if (response.status === 'Success') {
                    authHelper.setToken(response.accessToken);
                    setCurrentAdmin(response.details);
                    const balanceData = await getUserBalance();
                    if (balanceData) {
                      setBalance(balanceData.details);
                      resetForm();
                      setSubmitting(false);
                      redirectUser('/dashboard');
                    }
                  }
                }).catch((err) => {
                  setSubmitting(false);
                  setStatus({success: err.response.payload.status, message: err.response.payload.message});
                });
              }}
            >
              {({ status, isSubmitting }) => {
                return (
                  <>
                  {status && status.success === 'error' && (
                  <div className='mb-lg-15 alert alert-danger text-center'>
                    <div className='alert-text font-weight-bold'>{status.message}</div>
                  </div>)}
                  <Form className="form-border">
                    <div className="field-set mb-3">
                      <label>Email or Phone</label>
                      <Field className="form-control mb-0" type="email" name="username" placeholder="Email or Phone Number" />
                      <ErrorMessage className='text-danger' name="username" component="div" />
                    </div>
                    <div className="field-set mb-3">
                      <label>Password</label>
                      <Field className="form-control mb-0" type="password" name="password" placeholder="Password" />
                      <ErrorMessage className='text-danger' name="password" component="div" />
                    </div>
                    <div className="mb-2 d-flex flex-row-reverse">
                      <Link className="text-primary" to="/auth/forgot">Forgot your password?</Link>
                    </div>
                    <div id='submit' className='text-center'>
                      <button
                        type='submit'
                        className='btn btn-main btn-primary color-2 w-100'
                        disabled={isSubmitting}
                      >
                        {!isSubmitting && <span className='indicator-label'>Continue</span>}
                        {isSubmitting && (
                          <span className='indicator-progress' style={{display: 'block'}}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                      <div className="clearfix"></div>
                      <div className="spacer-single"></div>
                      <p>Don't have an account?  <Link className="text-danger" to="/auth/register">Sign up</Link></p>
                    </div>
                  </Form>
                  </>
                )
              }}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  )
};
export default Login;