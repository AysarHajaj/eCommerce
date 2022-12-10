import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  get: {
    data: [],
    isFetched: false,
    error: null,
  },
  delete: {
    data: "",
    isFetched: false,
    error: null,
  },
};

export const getSubCategories = createAsyncThunk("sub_categories/get", () =>
  api
    .getSubCategories()
    .then((response) => response.data)
    .catch((error) => error)
);
export const deleteSubCategory = createAsyncThunk(
  "sub_categories/delete",
  (id) =>
    api
      .deleteSubCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => error)
);

export const subCategorySlice = createSlice({
  name: "sub_category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get sub_categories case
      .addCase(getSubCategories.pending, (state) => {
        state.get.isFetched = false;
        state.get.error = null;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.get.isFetched = true;
        state.get.data = action.payload.data;
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.get.isFetched = true;
        state.get.error = action.payload;
      })
      //delete sub_categories case

      .addCase(deleteSubCategory.pending, (state) => {
        state.delete.isFetched = false;
        state.delete.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.delete.isFetched = true;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (subCategory) => subCategory.id != action.payload.id
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.delete.isFetched = true;
        state.delete.error = action.payload;
      });
  },
});

export const selectGetSubCategories = (state) => state.sub_category.get;
export const selectDeleteSubCategories = (state) => state.sub_category.delete;
export default subCategorySlice.reducer;
