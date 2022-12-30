import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get_active_shop_categories: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const getActiveShopCategories = createAsyncThunk(
  constants.ACTION_TYPES.home_page.get_active_shop_categories,
  (_, { rejectWithValue }) =>
    api
      .getActiveShopCategories()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const homePageSlice = createSlice({
  name: 'home_page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get active shop categories case
      .addCase(getActiveShopCategories.pending, (state) => {
        state.get_active_shop_categories.isLoading = true;
        state.get_active_shop_categories.error = null;
      })
      .addCase(getActiveShopCategories.fulfilled, (state, action) => {
        state.get_active_shop_categories.isLoading = false;
        state.get_active_shop_categories.data = action.payload.result;
      })
      .addCase(getActiveShopCategories.rejected, (state, action) => {
        state.get_active_shop_categories.isLoading = false;
        state.get_active_shop_categories.error = action.payload;
      });
  },
});

export const selectGetActiveShopCategories = (state) => state.home_page.get_active_shop_categories;

export default homePageSlice.reducer;
