/* eslint-disable react/button-has-type */
import React from 'react';

export default function Form() {
  return (
    <form className="coupon">
      <h5 className="title coupon-title font-weight-bold text-uppercase">Coupon Discount</h5>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Enter coupon code here..."
        required
      />
      <button className="btn btn-dark btn-outline btn-rounded">Apply Coupon</button>
    </form>
  );
}
