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
  get_child_category_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_child_category: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_child_category: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getChildCategories = createAsyncThunk(
  constants.ACTION_TYPES.child_category.get_list,
  (_, { rejectWithValue }) =>
    api
      .getChildCategories()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteChildCategory = createAsyncThunk(
  constants.ACTION_TYPES.child_category.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteChildCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeChildCategoryStatus = createAsyncThunk(
  constants.ACTION_TYPES.child_category.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeChildCategoryStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getChildCategoryById = createAsyncThunk(
  constants.ACTION_TYPES.child_category.get,
  (id, { rejectWithValue }) =>
    api
      .getChildCategoryById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateChildCategory = createAsyncThunk(
  constants.ACTION_TYPES.child_category.put,
  (data, { rejectWithValue }) =>
    api
      .updateChildCategory(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postChildCategory = createAsyncThunk(
  constants.ACTION_TYPES.child_category.post,
  (data, { rejectWithValue }) =>
    api
      .postChildCategory(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const childCategorySlice = createSlice({
  name: 'child_category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get child_categories case
      .addCase(getChildCategories.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getChildCategories.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.data;
      })
      .addCase(getChildCategories.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })
      // delete sub_categories case

      .addCase(deleteChildCategory.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteChildCategory.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (childCategory) => childCategory.id !== action.payload.id,
        );
      })
      .addCase(deleteChildCategory.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change category status case

      .addCase(changeChildCategoryStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeChildCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
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
        state.change_status.isLoading = false;
        state.change_status.error = action.payload;
      })
      // get category by id case

      .addCase(getChildCategoryById.pending, (state) => {
        state.get_child_category_by_id.isLoading = true;
        state.get_child_category_by_id.error = null;
      })
      .addCase(getChildCategoryById.fulfilled, (state, action) => {
        state.get_child_category_by_id.isLoading = false;
        state.get_child_category_by_id.data = action.payload.data;
      })
      .addCase(getChildCategoryById.rejected, (state, action) => {
        state.get_child_category_by_id.isLoading = false;
        state.get_child_category_by_id.error = action.payload;
      })
      // update category case

      .addCase(updateChildCategory.pending, (state) => {
        state.update_child_category.isLoading = true;
        state.update_child_category.error = null;
      })
      .addCase(updateChildCategory.fulfilled, (state, action) => {
        state.update_child_category.isLoading = false;
        state.update_child_category.data = action.payload.data;
      })
      .addCase(updateChildCategory.rejected, (state, action) => {
        state.update_child_category.isLoading = false;
        state.update_child_category.error = action.payload;
      })
      // post category case

      .addCase(postChildCategory.pending, (state) => {
        state.post_child_category.isLoading = true;
        state.post_child_category.error = null;
      })
      .addCase(postChildCategory.fulfilled, (state, action) => {
        state.post_child_category.isLoading = false;
        state.post_child_category.data = action.payload.data;
      })
      .addCase(postChildCategory.rejected, (state, action) => {
        state.post_child_category.isLoading = false;
        state.post_child_category.error = action.payload;
      });
  },
});

export const selectGetChildCategories = (state) => state.child_category.get;
export const selectDeleteChildCategories = (state) => state.child_category.delete;
export const selectChangeChildCategoriesStatus = (state) => state.child_category.change_status;
export const selectGetChildCategoryById = (state) => state.child_category.get_child_category_by_id;
export const selectUpdateChildCategory = (state) => state.child_category.update_child_category;
export const selectPostChildCategory = (state) => state.child_category.post_child_category;
export default childCategorySlice.reducer;
