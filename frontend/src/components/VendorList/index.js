/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import VendorCard from '../VendorCard';

function VendorList({ vendors }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchVendorText, setSearchVendorText] = useState('');
  const searchRef = useRef();
  const { id } = useParams();

  const filteredShops = useMemo(
    () =>
      vendors.filter(
        (vendor) =>
          vendor?.shop?.name
            ?.toLocaleLowerCase()
            ?.includes(searchVendorText?.toLocaleLowerCase()) &&
          vendor.shop.shop_category_id === +id,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchVendorText, vendors, id],
  );

  return (
    <div className="page-content w-100 mb-8">
      <div className="container">
        <div className="toolbox vendor-toolbox pb-0">
          <div className="toolbox-left mb-4 mb-md-0">
            <button
              className="btn btn-primary btn-outline btn-rounded btn-icon-left vendor-search-toggle "
              id="filter"
              type="button"
              onClick={() => setOpenFilter((open) => !open)}
            >
              <i className="w-icon-category" /> Filter
            </button>
            <label className="d-block">Total Store Showing {vendors.length}</label>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-sort select-box mb-0">
              <label className="font-weight-normal">Sort by:</label>
              <select name="orderby" className="form-control">
                <option value="default">Default</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            <div className="toolbox-item toolbox-layout mb-0 d-flex">
              <a className="icon-mode-grid btn-layout active">
                <i className="w-icon-grid" />
              </a>
              <a className="icon-mode-list btn-layout">
                <i className="w-icon-list" />
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: openFilter ? 'block' : 'none' }} className="vendor-search-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchVendorText(searchRef.current?.value);
            }}
            className="vendor-search-form"
          >
            <input
              type="text"
              className="form-control mr-4 bg-white"
              name="vendor"
              id="vendor"
              placeholder="Search Vendors"
              ref={searchRef}
            />
            <button className="btn btn-primary btn-rounded" type="submit">
              Apply
            </button>
          </form>
        </div>
        <div className="row cols-lg-3 cols-md-2 cols-sm-2 cols-1 mt-4">
          {filteredShops.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}

VendorList.propTypes = {
  vendors: PropTypes.array.isRequired,
};
export default VendorList;
