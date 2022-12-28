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

export const getActiveVendors = createAsyncThunk(
  constants.ACTION_TYPES.vendors_page.get,
  (_, { rejectWithValue }) =>
    api
      .getActiveVendors()
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
      .addCase(getActiveVendors.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getActiveVendors.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getActiveVendors.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      });
  },
});

export const selectGetVendors = (state) => state.vendors_page.get;

export default vendorsPageSlice.reducer;
