import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getProductsByVendorId,
  selectGetProductsByVendorId,
  getCategoriesByVendorId,
  selectGetCategoriesByVendorId,
} from './productsPageSlice';
import ProductList from '../../components/ProductList';
import ProductCategoriesCarousel from '../../components/ProductCategoriesCarousel';

function ProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetProductsByVendorId);
  const { data: categories } = useSelector(selectGetCategoriesByVendorId);

  useEffect(() => {
    dispatch(getProductsByVendorId(id));
    dispatch(getCategoriesByVendorId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="page-content w-100">
      <div className="container">
        <ProductCategoriesCarousel categories={categories} />
        <ProductList products={data} />
      </div>
    </div>
  );
}

export default ProductsPage;
