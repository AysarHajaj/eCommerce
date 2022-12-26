import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';

function ProductList({ products }) {
  return (
    <div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
export default ProductList;
