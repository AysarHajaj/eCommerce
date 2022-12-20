import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/Category/categorySlice';
import subCategoryReducer from '../features/SubCategory/subCategorySlice';
import childCategoryReducer from '../features/ChildCategory/childCategorySlice';
import loginReducer from '../features/Login/loginSlice';
import vendorReducer from '../features/Vendor/vendorSlice';
import productReducer from '../features/Products/productSlice';
import shopReducer from '../features/Shops/shopSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    sub_category: subCategoryReducer,
    child_category: childCategoryReducer,
    login: loginReducer,
    vendor: vendorReducer,
    product: productReducer,
    shop: shopReducer,
  },
});
