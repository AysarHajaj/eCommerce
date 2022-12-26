import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get_by_vendor_id: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const getProductsByVendorId = createAsyncThunk(
  constants.ACTION_TYPES.products_page.get_by_vendor_id,
  (id, { rejectWithValue }) =>
    api
      .getProductsByVendorId(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const productsPageSlice = createSlice({
  name: 'products_page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get products by vendor id case
      .addCase(getProductsByVendorId.pending, (state) => {
        state.get_by_vendor_id.isLoading = true;
        state.get_by_vendor_id.error = null;
      })
      .addCase(getProductsByVendorId.fulfilled, (state, action) => {
        state.get_by_vendor_id.isLoading = false;
        state.get_by_vendor_id.data = action.payload.result;
      })
      .addCase(getProductsByVendorId.rejected, (state, action) => {
        state.get_by_vendor_id.isLoading = false;
        state.get_by_vendor_id.error = action.payload;
      });
  },
});

export const selectGetProductsByVendorId = (state) => state.products_page.get_by_vendor_id;

export default productsPageSlice.reducer;
