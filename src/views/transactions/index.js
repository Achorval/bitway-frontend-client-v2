import React, {Fragment, useEffect, useState} from 'react';
import request from '../../core/auth/request';
import { createGlobalStyle } from 'styled-components';
import Header from '../../core/menu/dashboardHeader';
import moment from 'moment';
import SkeletonLoader from '../../core/components/SkeletonLoader';
import Pagination from '../../core/components/Pagination';

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

const Transactions= () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const renderStatus = (status) => {
    switch (status) {
      case "success":
        return (
        < span className='d-plus'>Success</span>
        )
        break;
      case "pending":
        return (
          <span className='text-warning'>Pending</span>
        )
        break;
      case "failed":
        return (
          <span className='d-min'>Failed</span>
        )
      break;
      default:
        break;
    }
  }

  const fetchTransactions = async (params) => {
    setIsLoading(true);
    const response = await request(`${API_URL}/transactions`, { 
      method: 'GET',
      params: params
    });
    if (response.status === "Success") {
      setIsLoading(false);
      setTransactions(response.details);
    }
  };

  useEffect(() => {
    fetchTransactions({
      page: currentPage,
      perPage: rowsPerPage
    });
  }, []);

  // ** Function to handle Pagination and get data
  const handlePageChange = page => {
    fetchTransactions({
      page: page + 1,
      perPage: rowsPerPage
    });
    setCurrentPage(page + 1)
  };

  // ** Function to handle per page
  const handleRowsPerPage = rowValue => {
    fetchTransactions({
      page: currentPage,
      perPage: parseInt(rowValue)
    });
    setRowsPerPage(parseInt(rowValue))
  }; 

  const renderService = (name) => {
    switch (name) {
      case "Buy Bitcoin":
        return (
          <img className="lazy" src="./img/misc/bitcoin.png" alt=""/>
        )
        break;
      case "Sell Bitcoin":
          return (
            <img className="lazy" src="./img/misc/bitcoin.png" alt=""/>
          )
      break;
      case "Buy USDT":
          return (
            <img className="lazy" src="./img/misc/usdt.png" alt=""/>
          )
      break;
      case "Sell USDT":
          return (
            <img className="lazy" src="./img/misc/usdt.png" alt=""/>
          )
      break;
      case "Withdrawal":
        return (
          <img className="lazy" src="./img/misc/withdraw.png" alt=""/>
        )
      break;
      default:
        break;
    }
  }

  return (
    <div>
      <Header />
      <GlobalStyles/>
      <section className='jumbotron breadcumb no-bg bg-custom-primary d-none d-lg-block'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
                <h1 className='text-center'>Transactions History</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='d-flex align-items-center justify-content-between mt-5'>
              <h3 className='mb-0'>Transaction History</h3>
              <div className="d-flex align-items-center">
                <span>Show</span>
                <select className="mx-1" value={rowsPerPage} onChange={(e) => handleRowsPerPage(e.target.value)}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
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
                </div>
                <div className="spacer-double"></div>
                {/** Mobile view End Here */}

                {/** Table pagination */}
                <Pagination
                  onPageChange={page => handlePageChange(page)}
                  totalPages={Math.ceil(transactions.totalItems / rowsPerPage)}
                  currentPage={currentPage}
                />
              </Fragment>
            ) : (
              <div className="d-flex align-items-center flex-column">
                <img src="./img/svg/empty.svg" width="200px" height="auto"/>
                <div className="fs-1 fw-bolder text-dark mb-4">No transactions found.</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Transactions;