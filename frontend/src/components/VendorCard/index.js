import React from 'react';
import PropTypes from 'prop-types';

function VendorCard({ vendor }) {
  return (
    <div>
      <div className="store-header">
        <figure>
          <img src={vendor.shop.image} alt="Vendor" />
        </figure>
      </div>

      <div className="store-content">
        <h4 className="store-title">{vendor.shop.name}</h4>
        <h4 className="store-address">{vendor.address}</h4>
        <h4 className="store-phone">{vendor.shop.phone}</h4>
      </div>

      <div className="store-footer">
        <figure>
          <img src={vendor.image} alt="Brand" />
        </figure>
        <a href="vendor.html">Visit Store</a>
      </div>
    </div>
  );
}

VendorCard.propTypes = {
  vendor: PropTypes.object.isRequired,
};
export default VendorCard;
