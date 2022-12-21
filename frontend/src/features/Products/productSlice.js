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
  get_product_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_product: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_product: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getVendorProducts = createAsyncThunk(
  constants.ACTION_TYPES.product.get_vendor,
  (id, { rejectWithValue }) =>
    api
      .getVendorProducts(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteProduct = createAsyncThunk(
  constants.ACTION_TYPES.product.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteProduct(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeProductStatus = createAsyncThunk(
  constants.ACTION_TYPES.product.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeProductStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getProductById = createAsyncThunk(
  constants.ACTION_TYPES.product.get,
  (id, { rejectWithValue }) =>
    api
      .getProductById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateProduct = createAsyncThunk(
  constants.ACTION_TYPES.product.put,
  (data, { rejectWithValue }) =>
    api
      .updateProduct(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postProduct = createAsyncThunk(
  constants.ACTION_TYPES.product.post,
  (data, { rejectWithValue }) =>
    api
      .postProduct(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get vendor products case
      .addCase(getVendorProducts.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getVendorProducts.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getVendorProducts.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      // delete products case

      .addCase(deleteProduct.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((product) => product.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change product status case

      .addCase(changeProductStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeProductStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, deactivated_at: action.payload.result.data };
          }
          return { ...product };
        });
      })
      .addCase(changeProductStatus.rejected, (state, action) => {
        state.get_product_by_id.isLoading = false;
        state.get_product_by_id.error = action.payload;
      })
      // get product by id case

      .addCase(getProductById.pending, (state) => {
        state.get_product_by_id.isLoading = true;
        state.get_product_by_id.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.get_product_by_id.isLoading = false;
        state.get_product_by_id.data = action.payload.result;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.get_product_by_id.isLoading = false;
        state.get_product_by_id.error = action.payload;
      })
      // update product case

      .addCase(updateProduct.pending, (state) => {
        state.update_product.isLoading = true;
        state.update_product.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.update_product.isLoading = false;
        state.update_product.data = action.payload.result;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.update_product.isLoading = false;
        state.update_product.error = action.payload;
      })
      // post product case

      .addCase(postProduct.pending, (state) => {
        state.post_product.isLoading = true;
        state.post_product.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.post_product.isLoading = false;
        state.post_product.data = action.payload.result;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.post_product.isLoading = false;
        state.post_product.error = action.payload?.error;
      });
  },
});

export const selectGetProducts = (state) => state.product.get;
export const selectDeleteProducts = (state) => state.product.delete;
export const selectChangeProductsStatus = (state) => state.product.change_status;
export const selectGetProductById = (state) => state.product.get_product_by_id;
export const selectUpdateProduct = (state) => state.product.update_product;
export const selectPostProduct = (state) => state.product.post_product;

export default productSlice.reducer;
