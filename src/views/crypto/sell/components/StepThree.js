// Workspace.js
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../index";
import * as yup from "yup";
import { Store } from 'react-notifications-component';

function SecondStep() {
  const { activeStepIndex, setActiveStepIndex, service, formData, setFormData } = useContext(FormContext);

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    Store.addNotification({
      title: "Successful!",
      message: "Address copied to clipboard",
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
  };

  const ValidationSchema = yup.object().shape({
    file: yup.mixed()
    .required('Please Upload Proof of Payment')
  });

  return (
    <Formik
      initialValues={{
        file: null
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        
      return (
        <Form>
          <div className="text-center mb-3">
            <div className="mx-auto" style={{width: "150px"}}>
              {service === "Bitcoin" ?
              <img className="lazy img-fluid" src="./img/items/bitcoin-qrcode.jpeg" alt="" />
              :
              <img className="lazy img-fluid" src="./img/items/usdt-qrcode.jpeg" alt="" />
              }
            </div>
            <p className="text-danger mt-2">
              {service === "Bitcoin" ?
                "Please send only Bitcoin to this wallet"
              :
                "Please send only USDT (trc20) to this wallet"
              }
            </p>

          </div>
          <div className="detailcheckout mb-3">
            <div className="listcheckout">
              <div className="input-group">
                <input type="text" className="form-control m-0" readOnly value={service === "Bitcoin" ? "3FUq8ZbTvTCiU2KWhENDv15mwzFhtnEuV2" : "TW3afMxcXFPAaTQwpwvugEi86eSPLsFUNr"} />
                <div className="input-group-append">
                  {service === "Bitcoin" ? 
                  <button type="button" title="Copy Text" className="btn btn-primary p-2" onClick={() => copyToClipboard("3FUq8ZbTvTCiU2KWhENDv15mwzFhtnEuV2")}>Copy</button>
                  :
                  <button type="button" title="Copy Text" className="btn btn-primary p-2" onClick={() => copyToClipboard("TW3afMxcXFPAaTQwpwvugEi86eSPLsFUNr")}>Copy</button>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='detailcheckout'>
            <div className='listcheckout'>
              <h6>Proof of Payment</h6>
              <div className="d-create-file p-3">
                <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                <div className='browse'>
                  <input type="button" id="get_file" className="btn-main mb-0" value="Browse"/>
                  <input id='upload_file'name="file" type="file" multiple onChange={(event) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      setFieldValue('file', fileReader.result);
                    }
                    };
                    fileReader.readAsDataURL(event.target.files[0]);
                  }} />
                </div>
              </div>
              {values.file && <div className="img-fluid text-center mt-3">
                <img src={values.file} alt='' width="100%" height={100} />
              </div>}
              {errors.file && <span className="text-danger">{errors.file}</span>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn-main lead btn2" type="button" onClick={() => setActiveStepIndex(activeStepIndex - 1)}>
              Back
            </button>
            <button className="btn-main lead" type="submit" >
              Continue
            </button>
          </div>
        </Form>
      )}}
    </Formik>
  );
}

export default SecondStep;