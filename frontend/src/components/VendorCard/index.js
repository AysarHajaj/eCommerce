/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function VendorCard({ vendor }) {
  return (
    <div className="store-wrap mb-4">
      <div className="store store-grid">
        <div className="store-header">
          <figure className="store-banner">
            <img
              src={vendor.shop.image}
              alt="Vendor"
              width="400"
              height="194"
              style={{ backgroundColor: '#40475E' }}
              className="vendors-cards-imgs"
            />
          </figure>
        </div>
        <div className="store-content">
          <h4 className="store-title">
            <a href="vendor.html">{vendor.shop.name}</a>
            <label className="featured-label">Featured</label>
          </h4>
          <div className="ratings-container">
            <div className="ratings-full">
              <span className="ratings" style={{ width: '100%' }} />
              <span className="tooltiptext tooltip-top" />
            </div>
          </div>
          <div className="store-address">{vendor.shop.address}</div>
          <ul className="seller-info-list list-style-none">
            <li className="store-phone">
              <a href="tel:1234567890">
                <i className="w-icon-phone">{vendor.shop.phone}</i>
              </a>
            </li>
          </ul>
        </div>
        <div className="store-footer">
          <figure className="seller-brand">
            <img src={vendor.image} alt="Brand" width="80" height="80" />
          </figure>
          <a
            href="vendor.html"
            className="btn btn-dark btn-link btn-underline btn-icon-right btn-visit"
          >
            <i className="w-icon-long-arrow-right">Visit Store</i>
          </a>
        </div>
      </div>
    </div>
  );
}

VendorCard.propTypes = {
  vendor: PropTypes.object.isRequired,
};
export default VendorCard;
