import React from 'react';
import * as Yup from 'yup';
import request from '../../core/auth/request';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Store } from 'react-notifications-component';

const API_URL = process.env.REACT_APP_API_URL;

const ChangePassword= () => {
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.lazy(() =>
      Yup.string()
        .required('current Password is required')
    ),
    newPassword: Yup.lazy(() =>
      Yup.string()
        .required('new Password is required')
    ),
    retypeNewPassword: Yup.string().when("newPassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Both password need to be the same"
      )
    })
  });

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    retypeNewPassword: ''
  };

  return (
    <div className='card h-100'>
      <div className='card-header'>Profile</div>
      <div className='card-body'>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          validateOnMount={validationSchema.isValidSync(initialValues)}
          onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
            setSubmitting(true);
            await request(`${API_URL}/security/change-password`, { method: 'POST', body: values})
            .then((response) => {
              resetForm();
              setSubmitting(false);
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
              {/* {status && status.success === 'success' && (
              <div className='mb-lg-15 alert alert-success text-center'>
                <div className='alert-text font-weight-bold'>{status.message}</div>
              </div>)} */}
              {status && status.success === 'error' && (
              <div className='mb-lg-15 alert alert-danger text-center'>
                <div className='alert-text font-weight-bold'>{status.message}</div>
              </div>)}
              <Form id="form-create-item" className="form-border" action="#">
                <div className="field-set mb-3">
                  <label>Current Password</label>
                  <Field className="form-control mb-0" type="password" name="currentPassword" />
                  <ErrorMessage className='text-danger' name="currentPassword" component="div" />
                </div>
                <div className="field-set mb-3">
                  <label>New Password</label>
                  <Field className="form-control mb-0" type="password" name="newPassword" />
                  <ErrorMessage className='text-danger' name="newPassword" component="div" />
                </div>
                <div className="field-set mb-3">
                  <label>Retype New Password</label>
                  <Field className="form-control mb-0" type="password" name="retypeNewPassword" />
                  <ErrorMessage className='text-danger' name="retypeNewPassword" component="div" />
                </div>
                <div className="field-set">
                  <button
                    type='submit'
                    className='btn btn-main btn-primary color-2 w-100'
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && <span className='indicator-label'>Change Password</span>}
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
      </div>
    </div>
  );
}
export default ChangePassword;