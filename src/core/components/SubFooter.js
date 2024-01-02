import React from 'react';

const SubFooter= () => (
    <footer className="footer-light p-0" style={{borderTop: 0}}>
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="de-flex">
                  <div className="de-flex-col">
                    <span onClick={()=> window.open("", "_self")}>
                      <img alt="" className="f-logo d-1" src="/img/bitway-logo.png" width="120px" />
                      <img alt="" className="f-logo d-3" src="/img/bitway-logo.png" width="120px" />
                      <img alt="" className="f-logo d-4" src="/img/bitway-logo.png" width="120px" />
                      <span className="copy">&copy; Copyright {new Date().getFullYear()} - Bitway, All rights reserved.</span>
                    </span>
                  </div>
                  <div className="de-flex-col">
                    <div className="social-icons">
                      <span onClick={()=> window.open("", "_self")}><i className="fa fa-facebook fa-lg"></i></span>
                      <span onClick={()=> window.open("", "_self")}><i className="fa fa-twitter fa-lg"></i></span>
                      <span onClick={()=> window.open("", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                      <span onClick={()=> window.open("", "_self")}><i className="fa fa-pinterest fa-lg"></i></span>
                      <span onClick={()=> window.open("", "_self")}><i className="fa fa-rss fa-lg"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
);
export default SubFooter;