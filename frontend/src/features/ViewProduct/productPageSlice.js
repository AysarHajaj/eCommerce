import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import constants from '../../constant';

const initialState = {
  get_single_product: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const getSingleProduct = createAsyncThunk(
  constants.ACTION_TYPES.product_page.get_single_product,
  (id, { rejectWithValue }) =>
    api
      .getSingleProduct(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const productPageSlice = createSlice({
  name: 'product_page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get products by vendor id case
      .addCase(getSingleProduct.pending, (state) => {
        state.get_single_product.isLoading = true;
        state.get_single_product.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.get_single_product.isLoading = false;
        state.get_single_product.data = action.payload.result;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.get_single_product.isLoading = false;
        state.get_single_product.error = action.payload;
      });
  },
});

export const selectGetSingleProduct = (state) => state.product_page.get_single_product;

export default productPageSlice.reducer;
