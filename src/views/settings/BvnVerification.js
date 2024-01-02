import React from 'react';
import Dojah from 'react-dojah';
import request from '../../core/auth/request';
import { Store } from 'react-notifications-component';

const API_URL = process.env.REACT_APP_API_URL;

const App = (props) => {
  /**
   *  This is your app ID
   * (go to your dashboard at
   * https://dojah.io/dashboard
   * to create an app and retrieve it)
   */
  const appID = "643a6d9f0c461100347c21e9";

  /**
   *  This is your account public key
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to
   *  retrieve it. You can also regenerate one)
   */
  const publicKey = "prod_pk_GMrfPyh8ZzhYXYnpCePPGOCyZ";

  /**
   *  This is the widget type you'd like to load
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to enable different
   *  widget types)
   */
  const type = "custom";

  const config = {
    debug: true,
    webhook: true, //Before you set webhook to true, Ensure you are subscribed to the webhook here https://api-docs.dojah.io/docs/subscribe-to-services
    pages: [
      {
        page: 'government-data',
        config: {
          bvn: true,
          nin: false,
          dl: false,
          mobile: false,
          otp: false,
          selfie: false,
        },
      },
      // { page: 'user-data', config: { enabled: false } },
      // { page: 'countries', config: { enabled: false } }, 
      // { page: 'business-data', config: {cac: true, tin: true, verification: true} },
      // { page: 'business-id' },
      // { page: 'selfie' },
      // { page: 'email', config: { verification: true }},
      // { page: 'id', config: { passport: true, dl: true , nin: true, voter:true, custom: true } },
    ],
  };

  /**
   *  These are the user's data to verify, options
   *  available to you possible options are:
   *  {first_name: STRING, last_name: STRING, dob: DATE STRING}
   *
   *  NOTE: Passing all the values will automatically skip
   *  the user-data page (thus the commented out `last_name`)
   */
  const userData = {
    first_name: props.authUser.firstname,
    last_name: props.authUser.lastname, // 'Nna'
    dob: '',
    residence_country: 'NG'
  };

  /**
   *  These are the metadata options
   *  You can pass any values within the object
   */
  const metadata = {
    user_id: '121',
  };
  
 const govData = {
    bvn: "456789654323",
    nin: "234567543233",
    dl: "3243546768767453423",
    mobile: "08034456679"
  };

  /**
   * @param {String} type
   * This method receives the type
   * The type can only be one of:
   * loading, begin, success, error, close
   * @param {String} data
   * This is the data from doja
   */
  const response = (type, data) => {
    // console.log(type);
    // console.log(data);
    if(type === 'success'){
      processUpdateBvn(data.verificationValue);
    }else if(type === 'error'){
    }else if(type === 'close'){
      document.location.reload()
    }else if(type === 'begin'){
    }else if(type === 'loading'){
    }
  };

  const processUpdateBvn = (bvn) => {
    request(`${API_URL}/security/bvn`, { 
      method: 'POST', 
      body: {
        bvn: bvn
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
    }).catch((err) => {
      
    });
  } 

  // The Doja library accepts 3 props and
  // initiliazes the doja widget and connect process
  return (
    <Dojah
      response={response}
      appID={appID}
      publicKey={publicKey}
      type={type}
      config={config}
      userData={userData}
      metadata={metadata}
      govdata= {govData}
    />
  );
}

export default App