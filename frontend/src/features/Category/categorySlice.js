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

export const getCategories = createAsyncThunk("categories/get", () =>
  api
    .getCategories()
    .then((response) => response.data)
    .catch((error) => error)
);
export const deleteCategory = createAsyncThunk("categories/delete", (id) =>
  api
    .deleteCategory(id)
    .then((response) => ({ data: response.data, id }))
    .catch((error) => error)
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get categories case
      .addCase(getCategories.pending, (state) => {
        state.get.isFetched = false;
        state.get.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.get.isFetched = true;
        state.get.data = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.get.isFetched = true;
        state.get.error = action.payload;
      })
      //delete categories case

      .addCase(deleteCategory.pending, (state) => {
        state.delete.isFetched = false;
        state.delete.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.delete.isFetched = true;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (category) => category.id != action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.delete.isFetched = true;
        state.delete.error = action.payload;
      });
  },
});

export const selectGetCategories = (state) => state.category.get;
export const selectDeleteCategories = (state) => state.category.delete;
export default categorySlice.reducer;
