import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import categoryReducer from "../features/Category/categorySlice";
import subCategoryReducer from "../features/SubCategory/subCategorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer,
    sub_category: subCategoryReducer,
  },
});
