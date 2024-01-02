import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import request from '../../core/auth/request';
import { createGlobalStyle } from 'styled-components';
import BuyCrypto from '../crypto/buy';
import SellCrypto from '../crypto/sell';
import Withdrawal from './withdrawal';
import Header from '../../core/menu/dashboardHeader';
import auth from '../../core/auth';
import { useAuth } from '../../core/utils/useAuth';
import moment from 'moment';
import { addZeroes } from '../../core/utils/helpers';
import BvnVerification from '../settings/BvnVerification';
import SkeletonLoader from '../../core/components/SkeletonLoader';
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

const Dashboard = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
  const [openBuyCrypto, setOpenBuyCrypto] = React.useState(false);
  const [openSellCrypto, setOpenSellCrypto] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [showVerification, setShowVerification] = useState(false);
  const { balance } = useAuth(); 
  const authUser = auth.getUserInfo();

  const fetchTransactions = async (params) => {
    setIsLoading(true);
    await request(`${API_URL}/transactions`, { 
      method: 'GET', 
      params: params
    })
    .then((response) => {
      setTransactions(response.details);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    (async () => {
      fetchTransactions({
        page: 1,
        perPage: 5
      });
    })();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "success":
        return (
        < span className='d-plus'>Success</span>
        )
      case "pending":
        return (
          <span className='text-warning'>Pending</span>
        )
      case "failed":
        return (
          <span className='d-min'>Failed</span>
        )
      default:
        break;
    }
  };

  const renderService = (name) => {
    switch (name) {
      case "Buy Bitcoin":
        return (
          <img className="lazy" src="./img/misc/bitcoin.png" alt=""/>
        )
      case "Sell Bitcoin":
          return (
            <img className="lazy" src="./img/misc/bitcoin.png" alt=""/>
          )
      case "Buy USDT":
          return (
            <img className="lazy" src="./img/misc/usdt.png" alt=""/>
          )
      case "Sell USDT":
          return (
            <img className="lazy" src="./img/misc/usdt.png" alt=""/>
          )
      case "Withdrawal":
        return (
          <img className="lazy" src="./img/misc/withdraw.png" alt=""/>
        )
      default:
        break;
    }
  };

  const renderInitialize = () => {
    if (window.confirm(`Verify your account to be able to buy Bitcoin`)) {
      setShowVerification(true);
    }
  };

  const handleComingSoon = () => {
    Store.addNotification({
      title: "Buy Crypto!",
      message: "Coming soon...",
      type: "warning",
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

  return (
    <div>
      <GlobalStyles/>
      <Header />
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <span>Welcome Back</span> 👋
                <h2 className='text-white mb-0'>{authUser && authUser.firstname+ ' ' +authUser.lastname}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container wallet-card-section position-relative d-none d-lg-block" 
      style={{top: '-60px'}}
      >
        <div className='row'>
          <div className='col-lg-6 mb30'>
            <div className="wallet-card h-100">
              <div className="balance">
                <div className="left">
                  <span className="title">Total Balance</span>
                  <h1 className="total">₦ {balance && addZeroes(balance.current)}</h1>
                </div>
                <div className="right">
                  <button className="btn-main lead" style={{borderRadius: "47px"}} onClick={() => setOpenWithdrawal(true)}>
                    <i className="fa fa-money me-2"></i>
                    Withdraw
                  </button>
                </div>
              </div>
              <div className="wallet-footer">
                {/* {authUser.isBvnVerified ?
                <button className="btn-main lead" onClick={() => setOpenBuyCrypto(true)} style={{borderRadius: "47px"}}>
                  <i className="fa fa-btc me-2"></i>
                  Buy Crypto 
                </button>
                :
                <button className="btn-main lead" onClick={() => renderInitialize()} style={{borderRadius: "47px"}}>
                  <i className="fa fa-btc me-2"></i>
                  Buy Crypto 
                </button>
                } */}
                <button className="btn-main lead" onClick={() => handleComingSoon()} style={{borderRadius: "47px"}}>
                  <i className="fa fa-btc me-2"></i>
                  Buy Crypto 
                </button>
                <button className="btn-main lead btn2" onClick={() => setOpenSellCrypto(true)} style={{borderRadius: "47px"}}>
                  <i className="fa fa-usd me-2"></i>
                  Sell Crypto
                </button>
              </div>
            </div>
          </div>
          <div className='col-lg-6 mb30'>
            <div className="wallet-card h-100">
              <div className='d-flex flex-column align-items-center justify-content-center text-center'>
                <img src="./img/users2.png" alt="" className="mb20"/>
                <h4>Refer a friend</h4>
                <span>Earn more when you refer your friends to join BitWay.</span>
                <h6 className='text-warning mt-2'>Coming Soon</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container wallet-card-section position-relative d-lg-none" 
      style={{marginTop: '120px'}}
      >
        <div className="wallet-card h-100 mb-5">
          <div className="balance">
            <div className="left">
              <span className="title">Total Balance</span>
              <h1 className="total">₦ {balance && addZeroes(balance.current)}</h1>
            </div>
            <div className="right">
              <button className="btn-main lead" style={{borderRadius: "47px"}} onClick={() => setOpenWithdrawal(true)}>
                <i className="fa fa-money me-2"></i>
                Withdraw
              </button>
            </div>
          </div>
          <div className="wallet-footer">
            {/* {authUser.isBvnVerified ?
            <button className="btn-main lead" onClick={() => setOpenBuyCrypto(true)} style={{borderRadius: "47px"}}>
              <i className="fa fa-btc me-2"></i>
              Buy Crypto 
            </button>
            :
            <button className="btn-main lead" onClick={() => renderInitialize()} style={{borderRadius: "47px"}}>
              <i className="fa fa-btc me-2"></i>
              Buy Crypto 
            </button>} */}
            <button className="btn-main lead" onClick={() => handleComingSoon()} style={{borderRadius: "47px"}}>
              <i className="fa fa-btc me-2"></i>
              Buy Crypto 
            </button>
            <button className="btn-main lead btn2" onClick={() => setOpenSellCrypto(true)} style={{borderRadius: "47px"}}>
              <i className="fa fa-usd me-2"></i>
              Sell Crypto
            </button>
          </div>
        </div>
      </div>
      <section className='container pt-0'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter centerEl d-flex align-items-center justify-content-between">
              <h3 className="text-dark mb-0">Transaction History</h3>
              <Link to="/transactions">See All</Link>
            </div>
            {isLoading ? (
              <SkeletonLoader 
                attrSpinner={{ 
                  baseColor: "#ebebeb", 
                  highlightColor: "#f5f5f5", 
                  height: "40px" 
                }} 
                attrCount={{ 
                  count: 5 
                }}
              />
            ) : transactions && transactions.allItems && Array.isArray(transactions.allItems) && transactions.allItems.length > 0 ? (
              <Fragment>
                <div className='d-none d-lg-block'>
                  <table className="table de-table table-rank">
                    <thead>
                      <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                      </tr>
                      <tr></tr>
                    </thead>
                    <tbody>
                      {transactions.allItems.map((value, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div className="coll_list_pp">
                              {renderService(value.service.name)}
                            </div>  
                            {value.service.name}
                          </th>
                          <td>{moment.utc(value.createdAt).local().format('MM-DD-YYYY, h:mm a')}</td>
                          <td>₦{value.amount}</td>
                          <td>{renderStatus(value.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/** Desktop view End Here */}

                {/** Mobile view Start Here */}
                <div className='d-lg-none'>
                  <table className="table de-table table-rank">
                    <tbody>
                      {transactions.allItems.map((value, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div className="coll_list_pp" style={{marginTop: 0}}>
                              {renderService(value.service.name)}
                            </div>  
                            <span>{value.service.name}</span> 
                            <br />
                            <span>{moment.utc(value.createdAt).local().format('MM-DD-YYYY, h:mm a')}</span>
                          </th>
                          <td>
                            <div>₦{value.amount}</div>
                            <div>{renderStatus(value.status)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="spacer-double"></div>
                </div>
                {/** Mobile view End Here */}
              </Fragment>
            ) : (
              <div className="d-flex align-items-center flex-column">
                <img src="./img/svg/empty.svg" alt='' width="200px" height="auto"/>
                <div className="fs-1 fw-bolder text-dark mb-4">No transactions found.</div>
              </div>
            )}
          </div>
        </div>
      </section>  
      <BuyCrypto openBuyCrypto={openBuyCrypto} setOpenBuyCrypto={setOpenBuyCrypto} />
      <SellCrypto openSellCrypto={openSellCrypto} setOpenSellCrypto={setOpenSellCrypto} />
      <Withdrawal openWithdrawal={openWithdrawal} setOpenWithdrawal={setOpenWithdrawal} />
      {showVerification && <BvnVerification authUser={authUser} />}
    </div>
  )
};

export default Dashboard;