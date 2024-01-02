import React from "react";
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TradingSteps = () => {

    return (
        <div className='nft'>
            <div className="row">
                <div className="col-lg-6">
                    <div className='col-lg-12'>
                        <h1>Start Trading in 3 Steps</h1>
                        <div className="small-border"></div>
                        <p>Unlock the full potential of your cryptocurrency and cash out with ease using our advanced features</p>
                        <div>
                            <h4>Create an Account</h4>
                            <p>Create a new account or login to your existing account through our mobile or web app</p>
                        </div>
                        <div>
                            <h4>Make Deposit</h4>
                            <p>Make a deposit with different available deposit options and make your payment</p>
                        </div>
                        <div>
                            <h4>Start Trading With Us</h4>
                            <p>Start Transacting with us 😊</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 xs1-hide">
                    <Reveal className='onStep w-75 h-75 m-auto' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
                        <img src="./img/tradingSteps.jpeg"  className="lazy img-fluid" alt=""/>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

export default TradingSteps;
