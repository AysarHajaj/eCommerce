/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function SideBar() {
  return (
    <div className="col-lg-4 sticky-sidebar-wrapper">
      <div className="sticky-sidebar">
        <div className="cart-summary mb-4">
          <h3 className="cart-title text-uppercase">Cart Totals</h3>
          <div className="cart-subtotal d-flex align-items-center justify-content-between">
            <label className="ls-25">Subtotal</label>
            <span>$100.00</span>
          </div>

          <hr className="divider" />

          <ul className="shipping-methods mb-2">
            <li>
              <label className="shipping-title text-dark font-weight-bold">Shipping</label>
            </li>
            <li>
              <div className="custom-radio">
                <input
                  type="radio"
                  id="free-shipping"
                  className="custom-control-input"
                  name="shipping"
                />
                <label htmlFor="free-shipping" className="custom-control-label color-dark">
                  Free Shipping
                </label>
              </div>
            </li>
            <li>
              <div className="custom-radio">
                <input
                  type="radio"
                  id="local-pickup"
                  className="custom-control-input"
                  name="shipping"
                />
                <label htmlFor="local-pickup" className="custom-control-label color-dark">
                  Local Pickup
                </label>
              </div>
            </li>
            <li>
              <div className="custom-radio">
                <input
                  type="radio"
                  id="flat-rate"
                  className="custom-control-input"
                  name="shipping"
                />
                <label htmlFor="flat-rate" className="custom-control-label color-dark">
                  Flat rate: $5.00
                </label>
              </div>
            </li>
          </ul>

          <div className="shipping-calculator">
            <p className="shipping-destination lh-1">
              Shipping to <strong>CA</strong>.
            </p>

            <form className="shipping-calculator-form">
              <div className="form-group">
                <div className="select-box">
                  <select name="country" className="form-control form-control-md">
                    <option value="default">United States (US)</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="fr">France</option>
                    <option value="aus">Australia</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="select-box">
                  <select name="state" className="form-control form-control-md">
                    <option value="default">California</option>
                    <option value="ohaio">Ohaio</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-md"
                  type="text"
                  name="town-city"
                  placeholder="Town / City"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-md"
                  type="text"
                  name="zipcode"
                  placeholder="ZIP"
                />
              </div>
              <button type="submit" className="btn btn-dark btn-outline btn-rounded">
                Update Totals
              </button>
            </form>
          </div>

          <hr className="divider mb-6" />
          <div className="order-total d-flex justify-content-between align-items-center">
            <label>Total</label>
            <span className="ls-50">$100.00</span>
          </div>
          <a href="#" className="btn btn-block btn-dark btn-icon-right btn-rounded  btn-checkout">
            Proceed to checkout
            <i className="w-icon-long-arrow-right" />
          </a>
        </div>
      </div>
    </div>
  );
}
