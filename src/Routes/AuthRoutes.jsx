import Loader from '../core/components/Loader';
import PrivateRoutes from './PrivateRoutes';
import AuthPage from '../views/auth/AuthPage';
// import LandingPage from '../Views/Landing';
import { useAuth } from '../core/utils/useAuth';
// import ErrorsPage from 'Views/Errors/ErrorPage';
import Logout from '../views/auth/Components/logout';
import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from '../views/landing/home';
import HelpCenter from '../views/landing/helpCenter';
import Contact from '../views/landing/contact';

const Routers = () => {
  // Get current admin
  const { currentAdmin } = useAuth();
  
  return (
    <BrowserRouter basename={'/'}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {currentAdmin !== undefined ? (
            <Fragment>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </Fragment>
          )}
          {/* <Route path='error/*' element={<ErrorsPage />} /> */}

          <Route element={<Home />}  path="/" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<HelpCenter />} path="/help-center" />
          <Route element={<Logout />} path='logout' />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
