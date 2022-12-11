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
export const changeChildCategoryStatus = createAsyncThunk(
  "child_categories/change_status",
  (id) =>
    api
      .changeChildCategoryStatus(id)
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
      })
      // change category status case

      .addCase(changeChildCategoryStatus.pending, (state) => {
        state.change_status.isFetched = false;
        state.change_status.error = null;
      })
      .addCase(changeChildCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isFetched = true;
        state.change_status.data = action.payload.data;
        state.get.data = state.get.data.map((childCategory) => {
          if (childCategory.id === action.payload.id) {
            return {
              ...childCategory,
              deactivated_at: action.payload.data.data,
            };
          }
          return { ...childCategory };
        });
      })
      .addCase(changeChildCategoryStatus.rejected, (state, action) => {
        state.change_status.isFetched = true;
        state.change_status.error = action.payload;
      });
  },
});

export const selectGetChildCategories = (state) => state.child_category.get;
export const selectDeleteChildCategories = (state) =>
  state.child_category.delete;
export const selectChangeChildCategoriesStatus = (state) =>
  state.category.change_status;
export default childCategorySlice.reducer;
