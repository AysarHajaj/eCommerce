/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import VendorCard from '../VendorCard';

function VendorList({ vendors }) {
  return (
    <div className="page-content mb-8">
      <div className="container">
        <div className="toolbox vendor-toolbox pb-0">
          <div className="toolbox-left mb-4 mb-md-0">
            <a
              href="#filter"
              className="btn btn-primary btn-outline btn-rounded btn-icon-left vendor-search-toggle "
              id="filter"
            >
              <i className="w-icon-category">Filter</i>
            </a>
            <label className="d-block">Total Store Showing {vendors.length}</label>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-sort select-box mb-0">
              <label className="font-weight-normal">Sort by:</label>
              <select name="orderby" className="form-control">
                <option value="default" selected="selected">
                  Default
                </option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            <div className="toolbox-item toolbox-layout mb-0 d-flex">
              <a href="#a" className="icon-mode-grid btn-layout active">
                <i className="w-icon-grid" />
              </a>
              <a href="#a" className="icon-mode-list btn-layout">
                <i className="w-icon-list" />
              </a>
            </div>
          </div>
        </div>
        <div className="vendor-search-wrapper open">
          <form className="vendor-search-form">
            <input
              type="email"
              className="form-control mr-4 bg-white"
              name="vendor"
              id="vendor"
              placeholder="Search Vendors"
            />
            <button className="btn btn-primary btn-rounded" type="submit">
              Apply
            </button>
          </form>
        </div>
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
