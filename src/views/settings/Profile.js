import React from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../core/utils/useAuth';
import request from '../../core/auth/request';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Store } from 'react-notifications-component';

const API_URL = process.env.REACT_APP_API_URL;

const Profile= () => {
  const { currentAdmin } = useAuth();
  const validationSchema = Yup.object().shape({
    firstName: Yup.lazy(() =>
      Yup.string()
        .required('First name is required')
    ),
    lastName: Yup.lazy(() =>
      Yup.string()
        .required('Last name is required')
    ),
    email: Yup.lazy(() =>
      Yup.string()
        .required('Email is required')
    ),
    phone: Yup.lazy(() =>
      Yup.string()
        .required('Phone number is required')
    )
  });
  
  const initialValues = {
    firstName: currentAdmin.firstname || '',
    lastName: currentAdmin.lastname || '',
    email: currentAdmin.email || '',
    phone: currentAdmin.phone || ''
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnMount={validationSchema.isValidSync(initialValues)}
      onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
        setSubmitting(true);
        await request(`${API_URL}/profile/update`, { 
          method: 'POST', 
          body: {
            firstname: values.firstName,
            lastname: values.lastName,
            phone: values.phone
          }
        })
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
          setSubmitting(false);
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
          <h1 className="text-dark fw-bolder fs-5">Profile Information</h1>
          <Form id="form-create-item" className="form-border" action="#">
            <div className="field-set mb-3">
              <label>First Name</label>
              <Field className="form-control mb-0" type="text" name="firstName" />
              <ErrorMessage className='text-danger' name="firstName" component="div" />
            </div>
            <div className="field-set mb-3">
              <label>Last Name</label>
              <Field className="form-control mb-0" type="text" name="lastName" />
              <ErrorMessage className='text-danger' name="lastName" component="div" />
            </div>
            <div className="field-set mb-3">
              <label>Email</label>
              <Field readOnly className="form-control mb-0" type="email" name="email" />
              <ErrorMessage className='text-danger' name="email" component="div" />
            </div>
            <div className="field-set mb-3">
              <label>Phone Number</label>
              <Field className="form-control mb-0" type="text" name="phone" />
              <ErrorMessage className='text-danger' name="phone" component="div" />
            </div>
            <div className="field-set">
              <button
                type='submit'
                className='btn btn-main btn-primary color-2 w-100'
                disabled={isSubmitting}
              >
                {!isSubmitting && <span className='indicator-label'>Update</span>}
                {isSubmitting && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </Form>
          </>
        )
      }}
    </Formik>
  );
}
export default Profile;