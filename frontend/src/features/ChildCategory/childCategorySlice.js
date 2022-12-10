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

export const getChildCategories = createAsyncThunk("child_categories/get", () =>
  api
    .getChildCategories()
    .then((response) => response.data)
    .catch((error) => error)
);
export const deleteChildCategory = createAsyncThunk(
  "child_categories/delete",
  (id) =>
    api
      .deleteChildCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => error)
);

export const childCategorySlice = createSlice({
  name: "child_category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get child_categories case
      .addCase(getChildCategories.pending, (state) => {
        state.get.isFetched = false;
        state.get.error = null;
      })
      .addCase(getChildCategories.fulfilled, (state, action) => {
        state.get.isFetched = true;
        state.get.data = action.payload.data;
      })
      .addCase(getChildCategories.rejected, (state, action) => {
        state.get.isFetched = true;
        state.get.error = action.payload;
      })
      //delete sub_categories case

      .addCase(deleteChildCategory.pending, (state) => {
        state.delete.isFetched = false;
        state.delete.error = null;
      })
      .addCase(deleteChildCategory.fulfilled, (state, action) => {
        state.delete.isFetched = true;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (childCategory) => childCategory.id != action.payload.id
        );
      })
      .addCase(deleteChildCategory.rejected, (state, action) => {
        state.delete.isFetched = true;
        state.delete.error = action.payload;
      });
  },
});

export const selectGetChildCategories = (state) => state.child_category.get;
export const selectDeleteChildCategories = (state) =>
  state.child_category.delete;
export default childCategorySlice.reducer;
