/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/publicPaths';

function AppHeader() {
  const navigate = useNavigate();
  return (
    <header className="header w-100 mb-3">
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <p className="welcome-msg">Welcome to Marsool</p>
          </div>
          <div className="header-right">
            <div className="dropdown">
              <a href="#currency">AED</a>
              <div className="dropdown-box">
                <a href="#currency">AED</a>
              </div>
            </div>

            <div className="dropdown">
              <a href="#language">
                <img
                  src={`${process.env.PUBLIC_URL}/images/flags/uae.webp`}
                  alt="UAE Flag"
                  width="14"
                  height="8"
                  className="dropdown-image"
                />{' '}
                UAE
              </a>
              <div className="dropdown-box">dropdown box</div>
            </div>

            <span className="divider d-lg-show" />
            <a href="blog.html" className="d-lg-show">
              Blog
            </a>
            <a href="c#" className="d-lg-show">
              Contact Us
            </a>
            <a href="my-account.html" className="d-lg-show">
              My Account
            </a>
            <a
              href="assets/ajax/#"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.LOGIN.path);
              }}
              className="d-lg-show login sign-in"
            >
              <i className="w-icon-account" />
              Sign In
            </a>
            <span className="delimiter d-lg-show">/</span>
            <a href="assets/ajax/#" className="ml-0 d-lg-show login register">
              Register
            </a>
          </div>
        </div>
      </div>

      <div className="header-middle main-header">
        <div className="container">
          <div className="header-left mr-md-4">
            <a className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle" />
            <a href="demo3.html" className="logo ml-lg-0">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
                width="100"
                height="45"
              />
            </a>
            <form
              method="get"
              action="#"
              className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper"
            >
              <div className="select-box">
                <select id="category" name="category" className="pb-0">
                  <option value="">All Categories</option>
                  <option value="4">Fashion</option>
                  <option value="5">Furniture</option>
                  <option value="6">Shoes</option>
                  <option value="7">Sports</option>
                  <option value="8">Games</option>
                  <option value="9">Computers</option>
                  <option value="10">Electronics</option>
                  <option value="11">Kitchen</option>
                  <option value="12">Clothing</option>
                </select>
              </div>
              <input
                type="text"
                className="form-control"
                name="search"
                id="search"
                placeholder="Search in..."
                required
              />
              <button className="btn btn-search" type="submit">
                <i className="w-icon-search" />
              </button>
            </form>
          </div>
          <div className="header-right ml-4">
            <div className="header-call d-xs-show d-lg-flex align-items-center">
              <a href="tel:#" className="w-icon-call" />
              <div className="call-info d-lg-show">
                <h4 className="chat font-weight-normal font-size-md text-normal ls-normal text-light mb-0">
                  <a href="mailto:#" className="text-capitalize">
                    Call Us Now
                  </a>{' '}
                  :
                </h4>
                <a href="tel:#" className="phone-number font-weight-bolder ls-50">
                  026-660-833
                </a>
              </div>
            </div>
            <a className="wishlist label-down link d-xs-show" href="#">
              <i className="w-icon-heart" />
              <span className="wishlist-label d-lg-show">Wishlist</span>
            </a>
            <div className="dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2">
              <div className="cart-overlay" />
              <a href="#" className="cart-toggle label-down link">
                <i className="w-icon-cart">
                  <span className="cart-count">2</span>
                </i>
                <span className="cart-label">Cart</span>
              </a>
              <div className="dropdown-box">
                <div className="cart-header">
                  <span>Shopping Cart</span>
                  <a href="#" className="btn-close">
                    Close
                    <i className="w-icon-long-arrow-right" />
                  </a>
                </div>

                <div className="products">products</div>

                <div className="cart-total">
                  <label>Subtotal:</label>
                  <span className="price">0.00 AED</span>
                </div>

                <div className="cart-action">
                  <a href="#" className="btn btn-dark btn-outline btn-rounded">
                    View Cart
                  </a>
                  <a href="#" className="btn btn-primary  btn-rounded">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
