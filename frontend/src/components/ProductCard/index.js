/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div className="product-wrap">
      <div className="product product-simple text-center">
        <figure className="product-media">
          <a href="product.html">
            <img
              className="vend-product-img"
              src={product.image}
              alt="Product"
              width="260"
              height="291"
            />
          </a>
          <div className="product-action-vertical">
            <a
              href="#a"
              className="btn-product-icon btn-wishlist w-icon-heart"
              title="Add to wishlist"
            ></a>
            <a
              href="#a"
              className="btn-product-icon btn-compare w-icon-compare"
              title="Add to Compare"
            ></a>
          </div>
          <div className="product-action">
            <a href="product.html" className="btn-product btn-quickview" title="Quick View">
              Quick View
            </a>
          </div>
        </figure>
        <div className="product-details">
          <h4 className="product-name">
            <a href="product.html">{product.english_name}</a>
          </h4>
          <div className="product-pa-wrapper">
            <div className="product-price">
              <ins className="new-price">{product.price}</ins>
            </div>
            <div className="product-action">
              <a
                href="#a"
                className="btn-cart btn-product btn btn-icon-right btn-link btn-underline"
              >
                Add To Cart
              </a>
            </div>
          </div>
          <div className="sold-by">
            <a href="#a"></a>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
export default ProductCard;
