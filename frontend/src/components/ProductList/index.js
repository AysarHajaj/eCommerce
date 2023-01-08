/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';

function ProductList({ products }) {
  return (
    <div className="shop-content row gutter-lg mb-10">
      <div style={{ width: '100%', maxWidth: '100%' }} className="main-content my-main-content">
        <nav className="toolbox sticky-toolbox sticky-content fix-top">
          <div className="toolbox-left">
            <a
              className="btn btn-primary btn-outline btn-rounded left-sidebar-toggle
                    btn-icon-left d-block d-lg-none"
            >
              <i className="w-icon-category"></i>
              <span>Filters</span>
            </a>
            <div className="toolbox-item toolbox-sort select-box text-dark">
              <label>Sort By :</label>
              <select name="orderby" className="form-control">
                <option value="default">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="date">Sort by latest</option>
                <option value="price-low">Sort by pric: low to high</option>
                <option value="price-high">Sort by price: high to low</option>
              </select>
            </div>
          </div>
          <div className="toolbox-right">
            <div className="toolbox-item toolbox-show select-box">
              <select name="count" className="form-control">
                <option value="9">Show 9</option>
                <option value="12">Show 12</option>
                <option value="24">Show 24</option>
                <option value="36">Show 36</option>
              </select>
            </div>
            <div className="toolbox-item toolbox-layout">
              <a className="icon-mode-grid btn-layout active">
                <i className="w-icon-grid"></i>
              </a>
              <a className="icon-mode-list btn-layout">
                <i className="w-icon-list"></i>
              </a>
            </div>
          </div>
        </nav>
        <div className="product-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-2">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>

        <div className="toolbox toolbox-pagination justify-content-between">
          <p className="showing-info mb-2 mb-sm-0">
            Showing<span>1-12 of 60</span>Products
          </p>
          <ul className="pagination">
            <li className="prev disabled">
              <a aria-label="Previous" tabindex="-1" aria-disabled="true">
                <i className="w-icon-long-arrow-left"></i>Prev
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link">1</a>
            </li>
            <li className="page-item">
              <a className="page-link">2</a>
            </li>
            <li className="next">
              <a aria-label="Next">
                Next<i className="w-icon-long-arrow-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
export default ProductList;
