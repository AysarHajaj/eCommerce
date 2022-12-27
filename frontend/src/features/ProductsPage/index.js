import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsByVendorId,
  selectGetProductsByVendorId,
  getCategoriesByVendorId,
  selectGetCategoriesByVendorId,
} from './productsPageSlice';
import ProductList from '../../components/ProductList';
import ShopCategoriesCarousel from '../../components/ShopCategoriesCarousel';

function ProductsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetProductsByVendorId);
  const { data: categories } = useSelector(selectGetCategoriesByVendorId);

  useEffect(() => {
    dispatch(getProductsByVendorId(5));
    dispatch(getCategoriesByVendorId(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ShopCategoriesCarousel categories={categories} />
      <ProductList products={data} />
    </div>
  );
}

export default ProductsPage;
