import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div className="product product-simple text-center">
      <figure>
        <a href="#view">
          <img src={product.image} alt="Product" />
        </a>
        <div className="product-action">
          <a href="#view">Quick View</a>
        </div>
      </figure>
      <div className="product-details">
        <h4 className="product-name">
          <a href="product-default.html">{product.name}</a>
        </h4>
        <div className="product-pa-wrapper">
          <div className="product-price">
            <ins className="new-price">{product.price}</ins>
          </div>
          <div className="product-action">
            <a
              href="#cart"
              className="btn-cart btn-product btn btn-icon-right btn-link btn-underline"
            >
              Add To Cart
            </a>
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
