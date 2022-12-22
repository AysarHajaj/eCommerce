import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/ProductCategory/categorySlice';
import subCategoryReducer from '../features/ProductSubCategory/subCategorySlice';
import loginReducer from '../features/Login/loginSlice';
import vendorReducer from '../features/Vendor/vendorSlice';
import productReducer from '../features/Products/productSlice';
import shopReducer from '../features/Shops/shopSlice';
import shopCategorySlice from '../features/ShopCategory/shopCategorySlice';

export const store = configureStore({
  reducer: {
    product_category: categoryReducer,
    product_sub_category: subCategoryReducer,
    login: loginReducer,
    vendor: vendorReducer,
    product: productReducer,
    shop: shopReducer,
    shop_category: shopCategorySlice,
  },
});
