import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer= () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <footer className="footer-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Products</h5>
                            <ul>
                                <li><Link to="">Bitcoin</Link></li>
                                <li><Link to="">USDT</Link></li>
                                <li><Link to="">Academy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Company</h5>
                            <ul>
                                <li><Link to="">About us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="">Careers</Link></li>
                                <li><Link to="">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Legal</h5>
                            <ul>
                                <li><Link to="/help-center">Help Center</Link></li>
                                <li><Link to="">Customer Protection Policy</Link></li>
                                <li><Link to="">Suggestions</Link></li>
                                <li><Link to="">Newsletter</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Newsletter</h5>
                            <p>Signup for our newsletter to get the latest news in your inbox.</p>
                            <form action="#" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> 
                                    <Link to="" id="btn-subscribe">
                                    <i className="arrow_right bg-color-secondary"></i>
                                    </Link>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>Your email is safe with us. We don't spam.</small>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <span onClick={() => window.open('https://facebook.com/bitwayhq', '_blank', 'noopener,noreferrer')}><i className="fa fa-facebook fa-lg"></i></span>
                                        <span onClick={() => window.open('https://twitter.com/bitwayhq', '_blank', 'noopener,noreferrer')}><i className="fa fa-twitter fa-lg"></i></span>
                                        <span onClick={() => window.open('https://instagram.com/bitwayhq', '_blank', 'noopener,noreferrer')}><i className="fa fa-instagram fa-lg"></i></span>
                                        <span onClick={() => window.open("https://www.linkedin.com/in/bitway", "_blank", 'noopener,noreferrer')}><i className="fa fa-linkedin fa-lg"></i></span>
                                        <span onClick={() => window.open("http://wa.me/2347047200600", "_blank", 'noopener,noreferrer')}><i className="fa fa-whatsapp fa-lg"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};
export default Footer;