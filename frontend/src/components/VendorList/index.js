import React from 'react';
import PropTypes from 'prop-types';
import VendorCard from '../VendorCard';

function VendorList({ vendors }) {
  return (
    <div>
      <div className="vendor-search-wrapper">
        <form>
          <input type="text" name="vendor" id="vendor" placeholder="Search Vendors" />
          <button className="btn btn-primary btn-rounded" type="submit">
            Apply
          </button>
        </form>
      </div>
      <div>
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

VendorList.propTypes = {
  vendors: PropTypes.array.isRequired,
};
export default VendorList;
