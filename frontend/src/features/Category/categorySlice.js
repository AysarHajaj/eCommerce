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
  change_status: {
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
export const changeCategoryStatus = createAsyncThunk(
  "categories/change_status",
  (id) =>
    api
      .changeCategoryStatus(id)
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
      })
      // change category status case

      .addCase(changeCategoryStatus.pending, (state) => {
        state.change_status.isFetched = false;
        state.change_status.error = null;
      })
      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isFetched = true;
        state.change_status.data = action.payload.data;
        state.get.data = state.get.data.map((category) => {
          if (category.id === action.payload.id) {
            return { ...category, deactivated_at: action.payload.data.data };
          }
          return { ...category };
        });
      })
      .addCase(changeCategoryStatus.rejected, (state, action) => {
        state.change_status.isFetched = true;
        state.change_status.error = action.payload;
      });
  },
});

export const selectGetCategories = (state) => state.category.get;
export const selectDeleteCategories = (state) => state.category.delete;
export const selectChangeCategoriesStatus = (state) =>
  state.category.change_status;
export default categorySlice.reducer;
