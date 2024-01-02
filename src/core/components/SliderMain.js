import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const slidermain= () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
          <div className="spacer-single"></div>
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <h6 className="">100% <span className="text-uppercase color">Guaranteed & Trusted</span></h6>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
            <h1 className="">
              Trade with Confidence: <br />
              <span className='text-primary'>Secure and transparent</span> Cyptocurrency <br /> platform
            </h1>
          </Reveal>
          <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
            <p className=" lead">
              Where technology meets expertise: Enjoy a seamless trading experience with our cutting-edge platform,
              designed for both novice and professional traders. Enjoy 24/7 customer support, advanced security features
              and real-time market insights to make informed trades.
            </p>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
              <Link to="/register" className="btn-main inline lead">Get Started</Link>
              <div className="mb-sm-30"></div>
          </Reveal>
      </div>
      <div className="col-md-6 xs-hide">
        <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
          <img src="./img/misc/dashboard.jpeg" className="lazy img-fluid" width={'85%'} alt=""/>
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermain;