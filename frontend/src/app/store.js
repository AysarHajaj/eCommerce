import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/ProductCategory/categorySlice';
import subCategoryReducer from '../features/ProductSubCategory/subCategorySlice';
import loginReducer from '../features/Login/loginSlice';
import vendorReducer from '../features/Vendor/vendorSlice';
import productReducer from '../features/Products/productSlice';
import shopReducer from '../features/Shops/shopSlice';
import cityReducer from '../features/Cities/citySlice';
import districtReducer from '../features/Districts/districtSlice';
import currencyReducer from '../features/Currencies/currencySlice';
import shopCategorySlice from '../features/ShopCategory/shopCategorySlice';
import vendorsPageSlice from '../features/VendorsPage/vendorsPageSlice';
import productsPageSlice from '../features/ProductsPage/productsPageSlice';

export const store = configureStore({
  reducer: {
    product_category: categoryReducer,
    product_sub_category: subCategoryReducer,
    login: loginReducer,
    vendor: vendorReducer,
    product: productReducer,
    shop: shopReducer,
    city: cityReducer,
    district: districtReducer,
    currency: currencyReducer,
    shop_category: shopCategorySlice,
    vendors_page: vendorsPageSlice,
    products_page: productsPageSlice,
  },
});
