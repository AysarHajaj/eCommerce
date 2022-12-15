import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import categoryReducer from "../features/Category/categorySlice";
import subCategoryReducer from "../features/SubCategory/subCategorySlice";
import childCategoryReducer from "../features/ChildCategory/childCategorySlice";
import loginReducer from "../features/Login/loginSlice";
import vendorReducer from "../features/Vendor/vendorSlice";
import productReducer from '../features/Products/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer,
    sub_category: subCategoryReducer,
    child_category: childCategoryReducer,
    login: loginReducer,
    vendor: vendorReducer,
    product: productReducer,
  },
});
