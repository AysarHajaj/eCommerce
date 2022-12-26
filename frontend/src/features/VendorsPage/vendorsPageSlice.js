import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const getVendorsByCategoryId = createAsyncThunk(
  constants.ACTION_TYPES.vendors_page.get,
  (id, { rejectWithValue }) =>
    api
      .getVendorsByCategoryId(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const vendorsPageSlice = createSlice({
  name: 'vendors_page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get vendors by category id case
      .addCase(getVendorsByCategoryId.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getVendorsByCategoryId.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getVendorsByCategoryId.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      });
  },
});

export const selectGetVendors = (state) => state.vendors_page.get;

export default vendorsPageSlice.reducer;
