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
};

export const getOrdersByStatus = createAsyncThunk(
  constants.ACTION_TYPES.order.get_by_status,
  (data, { rejectWithValue }) =>
    api
      .getOrdersByStatus(data.status, data.vendor_id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteOrder = createAsyncThunk(
  constants.ACTION_TYPES.order.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteOrder(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get vendor products case
      .addCase(getOrdersByStatus.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      // delete products case

      .addCase(deleteOrder.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((product) => product.id !== action.payload.id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectGetOrders = (state) => state.order.get;
export const selectDeleteOrder = (state) => state.order.delete;

export default orderSlice.reducer;
