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

export const getShopCategories = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.get_list,
  (_, { rejectWithValue }) =>
    api
      .getShopCategories()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteShopCategory = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteShopCategory(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeShopCategoryStatus = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeShopCategoryStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getShopCategoryById = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.get,
  (id, { rejectWithValue }) =>
    api
      .getShopCategoryById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateShopCategory = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.put,
  (data, { rejectWithValue }) =>
    api
      .updateShopCategory(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postShopCategory = createAsyncThunk(
  constants.ACTION_TYPES.shop_category.post,
  (data, { rejectWithValue }) =>
    api
      .postShopCategory(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const shopCategorySlice = createSlice({
  name: 'shop_category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get categories case
      .addCase(getShopCategories.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getShopCategories.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getShopCategories.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })
      // delete categories case

      .addCase(deleteShopCategory.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteShopCategory.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((category) => category.id !== action.payload.id);
      })
      .addCase(deleteShopCategory.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change category status case

      .addCase(changeShopCategoryStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeShopCategoryStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((category) => {
          if (category.id === action.payload.id) {
            return { ...category, deactivated_at: action.payload.result };
          }
          return { ...category };
        });
      })
      .addCase(changeShopCategoryStatus.rejected, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.error = action.payload;
      })
      // get category by id case

      .addCase(getShopCategoryById.pending, (state) => {
        state.get_category_by_id.isLoading = true;
        state.get_category_by_id.error = null;
      })
      .addCase(getShopCategoryById.fulfilled, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.data = action.payload.result;
      })
      .addCase(getShopCategoryById.rejected, (state, action) => {
        state.get_category_by_id.isLoading = false;
        state.get_category_by_id.error = action.payload;
      })
      // update category case

      .addCase(updateShopCategory.pending, (state) => {
        state.update_category.isLoading = true;
        state.update_category.error = null;
      })
      .addCase(updateShopCategory.fulfilled, (state, action) => {
        state.update_category.isLoading = false;
        state.update_category.data = action.payload.result;
      })
      .addCase(updateShopCategory.rejected, (state, action) => {
        state.update_category.isLoading = false;
        state.update_category.error = action.payload;
      })
      // post category case

      .addCase(postShopCategory.pending, (state) => {
        state.post_category.isLoading = true;
        state.post_category.error = null;
      })
      .addCase(postShopCategory.fulfilled, (state, action) => {
        state.post_category.isLoading = false;
        state.post_category.data = action.payload.result;
      })
      .addCase(postShopCategory.rejected, (state, action) => {
        state.post_category.isLoading = false;
        state.post_category.error = action.payload;
      });
  },
});

export const selectGetShopCategories = (state) => state.shop_category.get;
export const selectDeleteShopCategories = (state) => state.shop_category.delete;
export const selectChangeShopCategoriesStatus = (state) => state.shop_category.change_status;
export const selectGetShopCategoryById = (state) => state.shop_category.get_category_by_id;
export const selectUpdateShopCategory = (state) => state.shop_category.update_category;
export const selectPostShopCategory = (state) => state.shop_category.post_category;

export default shopCategorySlice.reducer;
