import React from "react";
import { Link } from "react-router-dom";
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

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
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CryptoTrainig = () => {

  return (
      <div className='nft'>
        <div className="row">
          <div className='col-lg-6'>
            <h1>Explore our Free Crypto Training</h1>
            <div className="small-border"></div>
            <p>Our training resources are designed to provide traders of all levels with the knowledge and skills they need to succeed in the crypto market. Whether you're a beginner or an experienced trader, our training materials will help you gain a deeper understanding of the crypto market and improve your trading skills.</p>
            <div className="spacer-10"></div>
            <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
              <a href="https://academy.bitway.ng" target="_blank" className="btn-main inline lead">Start Learning Now</a>
            </Reveal>
            <div className="spacer-10"></div>
          </div>
          <div className='col-lg-6'>
            <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
              <img src="./img/misc/studying.jpg" className="lazy img-fluid" alt=""/>
            </Reveal>
          </div>
        </div>
      </div>
  );
}

export default CryptoTrainig;
