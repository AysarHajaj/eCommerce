import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  get: {
    data: [],
    isLoading: false,
    error: null,
  },
  delete: {
    data: "",
    isLoading: false,
    error: null,
  },
  change_status: {
    data: "",
    isLoading: false,
    error: null,
  },
};

export const getSubCategories = createAsyncThunk(
  "sub_categories/get",
  (data = null, { rejectWithValue }) =>
    api
      .getSubCategories()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);
export const deleteSubCategory = createAsyncThunk(
  "sub_categories/delete",
  (id, { rejectWithValue }) =>
    api
      .deleteSubCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data))
);
export const changeSubCategoryStatus = createAsyncThunk(
  "sub_categories/change_status",
  (id, { rejectWithValue }) =>
    api
      .changeSubCategoryStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const subCategorySlice = createSlice({
  name: "sub_category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get sub_categories case
      .addCase(getSubCategories.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.data;
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })
      //delete sub_categories case

      .addCase(deleteSubCategory.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (subCategory) => subCategory.id != action.payload.id
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change category status case

      .addCase(changeSubCategoryStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeSubCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.data;
        state.get.data = state.get.data.map((subCategory) => {
          if (subCategory.id === action.payload.id) {
            return { ...subCategory, deactivated_at: action.payload.data.data };
          }
          return { ...subCategory };
        });
      })
      .addCase(changeSubCategoryStatus.rejected, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.error = action.payload;
      });
  },
});

export const selectGetSubCategories = (state) => state.sub_category.get;
export const selectDeleteSubCategories = (state) => state.sub_category.delete;
export const selectChangeSubCategoriesStatus = (state) =>
  state.category.change_status;
export default subCategorySlice.reducer;
