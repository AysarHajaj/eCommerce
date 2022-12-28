/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

export default function Footer() {
  return (
    <footer
      className="footer appear-animate main-footer w-100 mt-5"
      data-animation-options="{
            'name': 'fadeIn'
        }"
      style={{
        animationDuration: '1.2s',
        visibility: 'visible',
        opacity: '1',
      }}
    >
      <div
        style={{
          backgroundColor: '#655EB5',
          clipPath:
            'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)',
        }}
        className="footer-info  pt-6 pb-6"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-2 col-lg-6 text-center border-end">
              <h1
                className=" m-0 text-center"
                style={{
                  fontSize: '80px',
                  color: '#fff',
                }}
              >
                <i className="bi bi-headset" />
              </h1>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="icon-box icon-box-side text-white">
                <div className="icon-box-content">
                  <h4 className="icon-box-title text-white text-uppercase mb-0">
                    Always at your service
                  </h4>
                  <p className="text-white">We have customer service 24 hours / 7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="widget widget-about">
                <a href="demo2.html" className="logo-footer">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="logo-footer"
                    width="144"
                    height="45"
                  />
                </a>
                <div className="widget-body">
                  <p className="widget-about-title">Got Question? Call us 24/7</p>
                  <a href="tel:026660833" className="widget-about-call">
                    026-660-833
                  </a>

                  <div className="social-icons social-icons-colored">
                    <a href="#any" className="social-icon social-facebook w-icon-facebook" />
                    <a href="#any" className="social-icon social-twitter w-icon-twitter" />
                    <a href="#any" className="social-icon social-instagram w-icon-instagram" />
                    <a href="#any" className="social-icon social-youtube w-icon-youtube" />
                    <a href="#any" className="social-icon social-pinterest w-icon-pinterest" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h3 className="widget-title">Company</h3>
                <ul className="widget-body">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Team Member</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="c#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Affilate</a>
                  </li>
                  <li>
                    <a href="#">Order History</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="widget-body">
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">View Cart</a>
                  </li>
                  <li>
                    <a href="#">Sign In</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-body">
                  <li>
                    <a href="#">Payment Methods</a>
                  </li>
                  <li>
                    <a href="#">Money-back guarantee!</a>
                  </li>
                  <li>
                    <a href="#">Product Returns</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Shipping</a>
                  </li>
                  <li>
                    <a href="#">Term and Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <p className="copyright">Copyright © 2021 Marsool. All Rights Reserved.</p>
          </div>
          <div className="footer-right">
            <span className="payment-label mr-lg-8">We're using safe payment for</span>
            <figure className="payment">
              <img
                src={`${process.env.PUBLIC_URL}/images/payment.png`}
                alt="payment"
                width="159"
                height="25"
              />
            </figure>
          </div>
        </div>
      </div>
    </footer>
  );
}
