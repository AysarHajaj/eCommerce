import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get: {
    data: [],
    isLoading: false,
    error: null,
  },
  delete: {
    data: '',
    isLoading: false,
    error: null,
  },
  change_status: {
    data: '',
    isLoading: false,
    error: null,
  },
  get_category_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_category: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_category: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getCategories = createAsyncThunk(
  constants.ACTION_TYPES.category.get_list,
  (_, { rejectWithValue }) =>
    api
      .getCategories()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteCategory = createAsyncThunk(
  constants.ACTION_TYPES.category.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeCategoryStatus = createAsyncThunk(
  constants.ACTION_TYPES.category.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeCategoryStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getCategoryById = createAsyncThunk(
  constants.ACTION_TYPES.category.get,
  (id, { rejectWithValue }) =>
    api
      .getCategoryById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateCategory = createAsyncThunk(
  constants.ACTION_TYPES.category.put,
  (data, { rejectWithValue }) =>
    api
      .updateCategory(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postCategory = createAsyncThunk(
  constants.ACTION_TYPES.category.post,
  (data, { rejectWithValue }) =>
    api
      .postCategory(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get categories case
      .addCase(getCategories.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })
      // delete categories case

      .addCase(deleteCategory.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter((category) => category.id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change category status case

      .addCase(changeCategoryStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.data;
        state.get.data = state.get.data.map((category) => {
          if (category.id === action.payload.id) {
            return { ...category, deactivated_at: action.payload.data.data };
          }
          return { ...category };
        });
      })
      .addCase(changeCategoryStatus.rejected, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.error = action.payload;
      })
      // get category by id case

      .addCase(getCategoryById.pending, (state) => {
        state.get_category_by_id.isLoading = true;
        state.get_category_by_id.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.data = action.payload.data;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.error = action.payload;
      })
      // update category case

      .addCase(updateCategory.pending, (state) => {
        state.update_category.isLoading = true;
        state.update_category.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.update_category.isLoading = false;
        state.update_category.data = action.payload.data;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.update_category.isLoading = false;
        state.update_category.error = action.payload;
      })
      // post category case

      .addCase(postCategory.pending, (state) => {
        state.post_category.isLoading = true;
        state.post_category.error = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.post_category.isLoading = false;
        state.post_category.data = action.payload.data;
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.post_category.isLoading = false;
        state.post_category.error = action.payload;
      });
  },
});

export const selectGetCategories = (state) => state.category.get;
export const selectDeleteCategories = (state) => state.category.delete;
export const selectChangeCategoriesStatus = (state) => state.category.change_status;
export const selectGetCategoryById = (state) => state.category.get_category_by_id;
export const selectUpdateCategory = (state) => state.category.update_category;
export const selectPostCategory = (state) => state.category.post_category;

export default categorySlice.reducer;
