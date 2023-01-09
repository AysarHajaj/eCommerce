/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/publicPaths';

function VendorCard({ vendor }) {
  const navigate = useNavigate();
  return (
    <div className="store-wrap mb-4">
      <div className="store store-grid">
        <div className="store-header">
          <figure style={{ height: '200px', width: '100%' }} className="store-banner">
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
            <a>{vendor.shop.name}</a>
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
              <a>
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
            className="btn btn-dark btn-link btn-underline btn-icon-right btn-visit"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.PRODUCTS_PAGE.dynamicPath(vendor.id));
            }}
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
