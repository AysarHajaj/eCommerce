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
  get_vendor_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_vendor: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_vendor: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getVendors = createAsyncThunk(
  constants.ACTION_TYPES.vendor.get_list,
  (_, { rejectWithValue }) =>
    api
      .getVendors()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteVendor = createAsyncThunk(
  constants.ACTION_TYPES.vendor.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteVendor(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeVendorStatus = createAsyncThunk(
  constants.ACTION_TYPES.vendor.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeVendorStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getVendorById = createAsyncThunk(
  constants.ACTION_TYPES.vendor.get,
  (id, { rejectWithValue }) =>
    api
      .getVendorById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateVendor = createAsyncThunk(
  constants.ACTION_TYPES.vendor.put,
  (data, { rejectWithValue }) =>
    api
      .updateVendor(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postVendor = createAsyncThunk(
  constants.ACTION_TYPES.vendor.post,
  (data, { rejectWithValue }) =>
    api
      .postVendor(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get vendors case
      .addCase(getVendors.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })
      // delete vendors case

      .addCase(deleteVendor.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((category) => category.id !== action.payload.id);
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change vendor status case

      .addCase(changeVendorStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeVendorStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((vendor) => {
          if (vendor.id === action.payload.id) {
            return { ...vendor, deactivated_at: action.payload.result.data };
          }
          return { ...vendor };
        });
      })
      .addCase(changeVendorStatus.rejected, (state, action) => {
        state.get_vendor_by_id.isLoading = false;
        state.get_vendor_by_id.error = action.payload;
      })
      // get vendor by id case

      .addCase(getVendorById.pending, (state) => {
        state.get_vendor_by_id.isLoading = true;
        state.get_vendor_by_id.error = null;
      })
      .addCase(getVendorById.fulfilled, (state, action) => {
        state.get_vendor_by_id.isLoading = false;
        state.get_vendor_by_id.data = action.payload.result;
      })
      .addCase(getVendorById.rejected, (state, action) => {
        state.get_vendor_by_id.isLoading = false;
        state.get_vendor_by_id.error = action.payload;
      })
      // update vendor case

      .addCase(updateVendor.pending, (state) => {
        state.update_vendor.isLoading = true;
        state.update_vendor.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.update_vendor.isLoading = false;
        state.update_vendor.data = action.payload.result;
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.update_vendor.isLoading = false;
        state.update_vendor.error = action.payload;
      })
      // post vendor case

      .addCase(postVendor.pending, (state) => {
        state.post_vendor.isLoading = true;
        state.post_vendor.error = null;
      })
      .addCase(postVendor.fulfilled, (state, action) => {
        state.post_vendor.isLoading = false;
        state.post_vendor.data = action.payload.result;
      })
      .addCase(postVendor.rejected, (state, action) => {
        state.post_vendor.isLoading = false;
        state.post_vendor.error = action.payload;
      });
  },
});

export const selectGetVendors = (state) => state.vendor.get;
export const selectDeleteVendors = (state) => state.vendor.delete;
export const selectChangeVendorsStatus = (state) => state.vendor.change_status;
export const selectGetVendorById = (state) => state.vendor.get_vendor_by_id;
export const selectUpdateVendor = (state) => state.vendor.update_vendor;
export const selectPostVendor = (state) => state.vendor.post_vendor;

export default vendorSlice.reducer;
