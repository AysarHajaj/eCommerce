import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/ProductCategory/categorySlice';
import subCategoryReducer from '../features/ProductSubCategory/subCategorySlice';
import childCategoryReducer from '../features/ChildCategory/childCategorySlice';
import loginReducer from '../features/Login/loginSlice';
import vendorReducer from '../features/Vendor/vendorSlice';
import productReducer from '../features/Products/productSlice';
import shopReducer from '../features/Shops/shopSlice';
import cityReducer from '../features/Cities/citySlice';

export const store = configureStore({
  reducer: {
    product_category: categoryReducer,
    product_sub_category: subCategoryReducer,
    child_category: childCategoryReducer,
    login: loginReducer,
    vendor: vendorReducer,
    product: productReducer,
    shop: shopReducer,
    city: cityReducer,
  },
});
