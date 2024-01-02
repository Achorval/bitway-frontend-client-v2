import React from 'react';
import Footer from '../../core/components/Footer';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from '../../core/menu/landingHeader';

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
`;

const logintwo= () => (
<div>
<GlobalStyles/>
  <Header />
  <section className='jumbotron breadcumb no-bg bg-custom-primary'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row'>
          <div className="col-md-8 offset-md-2 text-center">
              <h1>Help Center</h1>

              <div className="spacer-20"></div>
              <form className="row" id='form_sb' name="myForm">
              <div className="col text-center">
                <input className="form-control" id='name_1' name='name_1' placeholder="type your question here" type='text'/> <button id="btn-submit"><i className="arrow_right" style={{background: "gray"}}></i></button>
              </div>
              </form>
              <div className="spacer-20"></div>
              
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <div className="row">
      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Getting Started</h4>
                  <p>Getting started with BitWay, How to Register, Login, Reset your Account Password and How to Make Money from Using BitWay.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>    

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Buying</h4>
                  <p>How to Buy Cryptocurrency on BitWay.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Selling</h4>
                  <p>How to Sell Cryptocurrency on BitWay.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Payment & Withdrawal</h4>
                  <p>How to Add your payment details , Setting Withdrawal Pin, Others.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Security</h4>
                  <p>Tips on how to secure your BitWay Account, Changing of Account Password, Changing of Withdrawal Pin.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center h-100">
              <div className="text">
                  <h4>Referral</h4>
                  <p>How to refer your friends and make money from BitWay.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  
  
    </div>
  </section>

  <Footer />
</div>

);
export default logintwo;