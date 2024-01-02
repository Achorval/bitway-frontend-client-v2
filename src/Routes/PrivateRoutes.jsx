import React, { Suspense } from 'react';
import Loader from '../core/components/Loader';
import ScrollToTopBtn from '../core/menu/ScrollToTop';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from '../views/dashboard';
import Transactions from '../views/transactions';
import Settings from '../views/settings';


const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const PrivateRoutes = () => (
  <div className="wraper">
    <GlobalStyles />
    {/* <Header/> */}
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route 
        path="/dashboard" 
        element={
          <SuspensedView>
            <Dashboard />
          </SuspensedView>
        } 
      />
      <Route  
        exact 
        path="/settings" 
        element={
          <SuspensedView>
            <Settings />
          </SuspensedView>
        }
      />
      <Route 
        path="/transactions" 
        element={
          <SuspensedView>
            <Transactions/>
          </SuspensedView>
        } 
      />
    </Routes>
    <ScrollToTopBtn />
  </div>
);

const SuspensedView = ({children}) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default PrivateRoutes;