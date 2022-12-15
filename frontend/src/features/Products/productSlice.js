import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  get: {
    data: [],
    isLoading: false,
    error: null,
  },
  delete: {
    data: "",
    isLoading: false,
    error: null,
  },
  change_status: {
    data: "",
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

export const getProducts = createAsyncThunk(
  "products/get",
  (data = null, { rejectWithValue }) =>
    api
      .getProducts()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const getVendorProducts = createAsyncThunk(
  "products/vendor/get",
  (id, { rejectWithValue }) =>
    api
      .getVendorProducts(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  (id, { rejectWithValue }) =>
    api
      .deleteProduct(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data))
);
export const changeProductStatus = createAsyncThunk(
  "products/change_status",
  (id, { rejectWithValue }) =>
    api
      .changeProductStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data))
);
export const getProductById = createAsyncThunk(
  "product/get/id",
  (id, { rejectWithValue }) =>
    api
      .getProductById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const updateProduct = createAsyncThunk(
  "product/update",
  (data, { rejectWithValue }) =>
    api
      .updateProduct(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const postProduct = createAsyncThunk(
  "product/post",
  (data, { rejectWithValue }) =>
    api
      .postProduct(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get products case
      .addCase(getProducts.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      //get vendor products case
      .addCase(getVendorProducts.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getVendorProducts.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.data;
      })
      .addCase(getVendorProducts.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      //delete products case

      .addCase(deleteProduct.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.data;
        state.get.data = state.get.data.filter(
          (product) => product.id != action.payload.id
        );
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
        state.change_status.data = action.payload.data;
        state.get.data = state.get.data.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, deactivated_at: action.payload.data.data };
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
        state.get_product_by_id.data = action.payload.data;
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
        state.update_product.data = action.payload.data;
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
        state.post_product.data = action.payload.data;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.post_product.isLoading = false;
        state.post_product.error = action.payload;
      });
  },
});

export const selectgetProducts = (state) => state.product.get;
export const selectDeleteproducts = (state) => state.product.delete;
export const selectChangeproductsStatus = (state) =>
  state.product.change_status;
export const selectGetproductById = (state) =>
  state.product.get_product_by_id;
export const selectUpdateproduct = (state) => state.product.update_product;
export const selectPostproduct = (state) => state.product.post_product;

export default productSlice.reducer;
