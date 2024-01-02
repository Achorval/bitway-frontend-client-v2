import React from 'react';
import { Link } from 'react-router-dom';

const Transactions= () => (
  <div>
    <div className='row'>
      <div className='col-lg-12'>
        <div className="items_filter centerEl d-flex align-items-center justify-content-between">
          <h3 className="text-dark mb-0">Transaction History</h3>
          <Link to="/transactions">See All</Link>
        </div>
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
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/misc/bitcoin.png" alt=""/>
                  </div>  
                  Buy Bitcoin
                </th>
                <td>Monday, 26th, Dec. 20227</td>
                <td>+₦10,000.00</td>
                <td className="d-plus">Successful</td>
              </tr>
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/misc/usdt.png" alt=""/>
                  </div>  
                  Sell Bitcoin
                </th>
                <td>Monday, 26th, Dec. 2022</td>
                <td>-₦10,000.00</td>
                <td className="d-min">Failed</td>
              </tr>
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/misc/withdraw.png" alt=""/>
                  </div>  
                  Withdraw
                </th>
                <td>Monday, 26th, Dec. 2022</td>
                <td>-₦10,000.00</td>
                <td className="d-min">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='d-lg-none'>
          <table className="table de-table table-rank">
            <tbody>
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/author/author-1.jpg" alt=""/>
                  </div>  
                  <span>Buy Bitcoin</span> 
                  <br />
                  <span>Monday, 26th, Dec. 2022</span>
                </th>
                <td>
                  <div>+₦10,000.00</div>
                  <div className="d-plus">Successful</div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/author/author-2.jpg" alt=""/>
                  </div>  
                  <span>Sell Bitcoin</span>
                  <br />
                  <span>Monday, 26th, Dec. 2022</span>
                </th>
                <td>
                  <div>-₦10,000.00</div>
                  <div className="d-min">Pending</div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <div className="coll_list_pp">
                    <img className="lazy" src="./img/author/author-3.jpg" alt=""/>
                  </div>  
                  <span>Buy USDT</span>
                  <br />
                  <span>Monday, 26th, Dec. 2022</span>
                </th>
                <td>
                  <div>-33.56%</div>
                  <div className='d-min'>Failed</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="spacer-double"></div>
          <ul className="pagination justify-content-center">
              <li className="active"><span>1 - 20</span></li>
              <li><span>21 - 40</span></li>
              <li><span>41 - 60</span></li>
          </ul> 
        </div>
      </div>
    </div>
  </div>
);
export default Transactions;