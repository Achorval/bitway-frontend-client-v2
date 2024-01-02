import React from 'react';
import { Tabs, Tab } from "react-bootstrap";
import { createGlobalStyle } from 'styled-components';
import Header from '../../core/menu/dashboardHeader';
import WithdrawalPin from './WithdrawPin';
import ChangePassword from './ChangePassword';
import BankAccounts from './BankAccounts';
import Profile from './Profile';


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
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
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
  .btn2 {
    background: rgb(246, 246, 246);
    color: rgb(131, 100, 226) !important;
  }
`;

const Settings= () => {

  return (
    <div>
      <GlobalStyles/>
      <Header />
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
                <h1>Account</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">      
          <div className='col-md-12'>
            <h3 className='mt-5'>Account</h3>
            <div id="tabs1">
              <Tabs fill defaultActiveKey="profile">
                <Tab eventKey="profile" title="Profile">
                  <Profile />
                </Tab>
                <Tab eventKey="security" title="Security">
                  <div className='row'>
                    <div className='col-md-6 mb-2 mb-lg-0'>
                      <ChangePassword />
                    </div>
                    <div className='col-md-6 mt-2 mt-lg-0'>
                      <WithdrawalPin  />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="bankAccount" title="Bank Account">
                  <BankAccounts />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Settings;