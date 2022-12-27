import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByVendorId, selectGetProductsByVendorId } from './productsPageSlice';
import ProductList from '../../components/ProductList';

function ProductsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetProductsByVendorId);

  useEffect(() => {
    dispatch(getProductsByVendorId(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ProductList products={data} />
    </div>
  );
}

export default ProductsPage;
