import React from "react";

const MobileApps = () => {

  return (
      <div className='nft'>
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card border-0 rounded-lg bg-custom-primary p-3 py-4 py-lg-5">
              <div className="card-body p-3 py-4 py-lg-5 my-lg-4">
                <div className="row g-4 justify-content-center align-items-center">
                  <div className="col-md-10 text-center">
                    <h2 className="mb-0 fs-42 fw-500 text-white display-4">
                      What are you waiting for? Download the Bitway App &amp; get
                      started now!
                    </h2>
                  </div>
                  <div className="col-md-6">
                    <div className="row align-items-center g-4 py-3 justify-content-center">
                      <div className="col-auto">
                        <a class="crypto-app-btn ml-3 text-decoration-none mb-3 mb-xl-0" href="/#">
                          <span class="crypto-btn-content-wrapper">
                            <span class="crypto-btn-icon">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" alt=""><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            </span>
                          <span class="text-wrapper">
                            <span class="btn-tagline">Download on the </span>
                            <span class="crypto-btn-text">App Store</span></span>
                          </span>
                        </a>
                      </div>
                      <div class="col-auto">
                        <a class="crypto-app-btn ml-3 text-decoration-none" href="/#">
                          <span class="crypto-btn-content-wrapper">
                            <span class="crypto-btn-icon">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" alt=""><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
                            </span>
                            <span class="text-wrapper">
                              <span class="btn-tagline">Get it on </span>
                              <span class="crypto-btn-text">Google Play</span>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    <p className="text-warning text-center mb-0">Coming soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MobileApps;
