import React from 'react';
import * as Yup from 'yup';
import authHelper from '../../../core/utils/AuthHelpers';
import request from '../../../core/auth/request';
import { Link , useNavigate} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Header from '../../../core/menu/authHeader';
import { Store } from 'react-notifications-component';

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
  firstName: Yup.lazy(() =>
    Yup.string()
      .required('Firstname is required')
  ),
  lastName: Yup.lazy(() =>
    Yup.string()
      .required('Lastname is required')
  ),
  email: Yup.lazy(() =>
    Yup.string()
      .required('Email is required')
  ),
  phone: Yup.lazy(() =>
    Yup.string()
      .required('Phone is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  ),
  confirmPassword: Yup.lazy(() =>
    Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  )
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
};

const Register= () => {

  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  };

  return (
    <div>
      <GlobalStyles />
      <Header />
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>Register</h1>
                <p>Let’s get you started! This will only take a few minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container'>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="col-md-12 text-center d-block d-sm-none mt-5">
              <h1>Register</h1>
              <p>Let’s get you started! This will only take a few minutes.</p>
            </div>
            <div className="spacer-10"></div>
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
                setSubmitting(true);
                await request(`${API_URL}/register`, { 
                  method: 'POST', 
                  body: {
                    firstname: values.firstName,
                    lastname: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    password: values.password
                  }
                })
                .then((response) => {
                  resetForm();
                  setSubmitting(false);      
                  redirectUser('/login');
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="field-set mb-3">
                        <label>First Name:</label>
                        <Field className="form-control mb-0" type="text" name="firstName" placeholder="FirstName" />
                        <ErrorMessage className='text-danger' name="firstName" component="div" />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="field-set mb-3">
                        <label>Last Name:</label>
                        <Field className="form-control mb-0" type="text" name="lastName" placeholder="LastName" />
                        <ErrorMessage className='text-danger' name="lastName" component="div" />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="field-set mb-3">
                        <label>Email:</label>
                        <Field className="form-control mb-0" type="email" name="email" placeholder="Email" />
                        <ErrorMessage className='text-danger' name="email" component="div" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="field-set mb-3">
                        <label>Phone:</label>
                        <Field className="form-control mb-0" type="text" name="phone" placeholder="Phone Number" />
                        <ErrorMessage className='text-danger' name="phone" component="div" />
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="field-set mb-3">
                        <label>Password:</label>
                        <Field className="form-control mb-0" type="password" name="password" placeholder="Password" />
                        <ErrorMessage className='text-danger' name="password" component="div" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="field-set mb-3">
                        <label>Confirm Password:</label>
                        <Field className="form-control mb-0" type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage className='text-danger' name="confirmPassword" component="div" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div id='submit' className="text-center mb-2">
                        <button
                          type='submit'
                          className='btn btn-main btn-primary color-2 w-100'
                          disabled={isSubmitting}
                        >
                          {!isSubmitting && <span className='indicator-label'>Register Now</span>}
                          {isSubmitting && (
                            <span className='indicator-progress' style={{display: 'block'}}>
                              Please wait...
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                      </div>
                      <div className="clearfix"></div>
                      <p className='text-center '>Already have an account?  <Link className="text-danger" to="/auth/login">Sign in</Link></p>
                    </div>
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

export default Register;