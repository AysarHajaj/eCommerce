import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get_shop_by_vendor_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_shop: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getShopByVendorId = createAsyncThunk(
  constants.ACTION_TYPES.shop.get,
  (id, { rejectWithValue }) =>
    api
      .getShopByVendorId(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateShop = createAsyncThunk(
  constants.ACTION_TYPES.shop.put,
  (data, { rejectWithValue }) =>
    api
      .updateShop(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get shop by vendor id case

      .addCase(getShopByVendorId.pending, (state) => {
        state.get_shop_by_vendor_id.isLoading = true;
        state.get_shop_by_vendor_id.error = null;
      })
      .addCase(getShopByVendorId.fulfilled, (state, action) => {
        state.get_shop_by_vendor_id.isLoading = false;
        state.get_shop_by_vendor_id.data = action.payload.data;
      })
      .addCase(getShopByVendorId.rejected, (state, action) => {
        state.get_shop_by_vendor_id.isLoading = false;
        state.get_shop_by_vendor_id.error = action.payload;
      })
      // update shop case

      .addCase(updateShop.pending, (state) => {
        state.update_shop.isLoading = true;
        state.update_shop.error = null;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.update_shop.isLoading = false;
        state.update_shop.data = action.payload.data;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.update_shop.isLoading = false;
        state.update_shop.error = action.payload;
      });
  },
});

export const selectGetShopByVendorId = (state) => state.shop.get_shop_by_vendor_id;
export const selectUpdateShop = (state) => state.shop.update_shop;

export default shopSlice.reducer;
