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
  get_district_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_district: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_district: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getDistricts = createAsyncThunk(
  constants.ACTION_TYPES.district.get_list,
  (_, { rejectWithValue }) =>
    api
      .getDistricts()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteDistrict = createAsyncThunk(
  constants.ACTION_TYPES.district.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteDistrict(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeDistrictStatus = createAsyncThunk(
  constants.ACTION_TYPES.district.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeDistrictStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getDistrictById = createAsyncThunk(
  constants.ACTION_TYPES.district.get,
  (id, { rejectWithValue }) =>
    api
      .getDistrictById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateDistrict = createAsyncThunk(
  constants.ACTION_TYPES.district.put,
  (data, { rejectWithValue }) =>
    api
      .updateDistrict(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postDistrict = createAsyncThunk(
  constants.ACTION_TYPES.district.post,
  (data, { rejectWithValue }) =>
    api
      .postDistrict(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get districts case
      .addCase(getDistricts.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      // delete district case

      .addCase(deleteDistrict.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((district) => district.id !== action.payload.id);
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change district status case

      .addCase(changeDistrictStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeDistrictStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((district) => {
          if (district.id === action.payload.id) {
            return { ...district, deactivated_at: action.payload.result.data };
          }
          return { ...district };
        });
      })
      .addCase(changeDistrictStatus.rejected, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.error = action.payload;
      })
      // get district by id case

      .addCase(getDistrictById.pending, (state) => {
        state.get_district_by_id.isLoading = true;
        state.get_district_by_id.error = null;
      })
      .addCase(getDistrictById.fulfilled, (state, action) => {
        state.get_district_by_id.isLoading = false;
        state.get_district_by_id.data = action.payload.result;
      })
      .addCase(getDistrictById.rejected, (state, action) => {
        state.get_district_by_id.isLoading = false;
        state.get_district_by_id.error = action.payload;
      })
      // update district case

      .addCase(updateDistrict.pending, (state) => {
        state.update_district.isLoading = true;
        state.update_district.error = null;
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        state.update_district.isLoading = false;
        state.update_district.data = action.payload.result;
      })
      .addCase(updateDistrict.rejected, (state, action) => {
        state.update_district.isLoading = false;
        state.update_district.error = action.payload;
      })
      // post district case

      .addCase(postDistrict.pending, (state) => {
        state.post_district.isLoading = true;
        state.post_district.error = null;
      })
      .addCase(postDistrict.fulfilled, (state, action) => {
        state.post_district.isLoading = false;
        state.post_district.data = action.payload.result;
      })
      .addCase(postDistrict.rejected, (state, action) => {
        state.post_district.isLoading = false;
        state.post_district.error = action.payload?.error;
      });
  },
});

export const selectGetDistricts = (state) => state.district.get;
export const selectDeleteDistrict = (state) => state.district.delete;
export const selectChangeDistrictStatus = (state) => state.district.change_status;
export const selectGetDistrictById = (state) => state.district.get_district_by_id;
export const selectUpdateDistrict = (state) => state.district.update_district;
export const selectPostDistrict = (state) => state.district.post_district;

export default districtSlice.reducer;
