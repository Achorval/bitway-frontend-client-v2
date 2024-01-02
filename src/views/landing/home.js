import React from 'react';
import SliderMain from '../../core/components/SliderMain';
import FeatureBox from '../../core/components/FeatureBox';
import TradingSteps from '../../core/components/TradingSteps';
import CryptoTrainig from '../../core/components/CryptoTrainig';
// import MobileApps from '../../core/components/MobileApps';
import FAQs from '../../core/components/Faqs';
import Footer from '../../core/components/Footer';
import Header from '../../core/menu/landingHeader';

const home= () => (
  <>
  <Header />
  <div>
    <section className="jumbotron breadcumb no-bg h-vh" style={{backgroundImage: `url(${'./img/bg-shape-1.jpg'})`}}>
      <SliderMain/>
    </section>

    <section className='container'>
      <FeatureBox/>
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <TradingSteps/>
        </div>
      </div>
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <CryptoTrainig/>
        </div>
      </div>
    </section>

    {/* <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <MobileApps/>
        </div>
      </div>
    </section> */}

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <FAQs/>
        </div>
      </div>
    </section>
    <Footer />
  </div>
  </>
);
export default home;