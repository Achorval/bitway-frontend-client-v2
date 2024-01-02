import React from 'react';
import ReactDOM from 'react-dom/client'; 
import "./assets/animated.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss';
import './assets/style_grey.scss';
import 'react-notifications-component/dist/theme.css'
// import App from './routing/router';
import App from './Routes/AuthRoutes';
import { AuthProvider, AuthInit } from './core/utils/useAuth';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'

//redux store
import { Provider } from 'react-redux'
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotifications />
      <AuthProvider>
        <AuthInit>
          <App />
        </AuthInit>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
