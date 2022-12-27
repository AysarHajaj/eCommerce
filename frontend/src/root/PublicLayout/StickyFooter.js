/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function AppFooter() {
  return (
    <div className="sticky-footer sticky-content fix-bottom">
      <a href="demo3.html" className="sticky-link active">
        <i className="w-icon-home" />
        <p>Home</p>
      </a>
      <a href="shop-banner-sidebar.html" className="sticky-link">
        <i className="w-icon-category" />
        <p>Shop</p>
      </a>
      <a href="my-account.html" className="sticky-link">
        <i className="w-icon-account" />
        <p>Account</p>
      </a>
      <div className="cart-dropdown dir-up">
        <a href="cart.html" className="sticky-link">
          <i className="w-icon-cart" />
          <p>Cart</p>
        </a>
        <div className="dropdown-box">
          <div className="products" />

          <div className="cart-total">
            <label>Subtotal:</label>
            <span className="price">58.67 AED</span>
          </div>

          <div className="cart-action">
            <a href="#viewcart" className="btn btn-dark btn-outline btn-rounded">
              View Cart
            </a>
            <a href="#checkout" className="btn btn-primary  btn-rounded">
              Checkout
            </a>
          </div>
        </div>
      </div>

      <div className="header-search hs-toggle dir-up">
        <a href="#search" className="search-toggle sticky-link">
          <i className="w-icon-search" />
          <p>Search</p>
        </a>
        <form action="#" className="input-wrapper">
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            placeholder="Search"
            required
          />
          <button className="btn btn-search" type="submit">
            <i className="w-icon-search" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppFooter;
