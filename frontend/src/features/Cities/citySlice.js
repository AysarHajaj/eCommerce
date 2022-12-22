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
  get_city_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_city: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_city: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getCities = createAsyncThunk(
  constants.ACTION_TYPES.city.get_list,
  (_, { rejectWithValue }) =>
    api
      .getCities()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteCity = createAsyncThunk(
  constants.ACTION_TYPES.city.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteCity(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeCityStatus = createAsyncThunk(
  constants.ACTION_TYPES.city.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeCityStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getCityById = createAsyncThunk(
  constants.ACTION_TYPES.city.get,
  (id, { rejectWithValue }) =>
    api
      .getCityById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateCity = createAsyncThunk(
  constants.ACTION_TYPES.city.put,
  (data, { rejectWithValue }) =>
    api
      .updateCity(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postCity = createAsyncThunk(
  constants.ACTION_TYPES.city.post,
  (data, { rejectWithValue }) =>
    api
      .postCity(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get cities case
      .addCase(getCities.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      // delete city case

      .addCase(deleteCity.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((city) => city.id !== action.payload.id);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change city status case

      .addCase(changeCityStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeCityStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((city) => {
          if (city.id === action.payload.id) {
            return { ...city, deactivated_at: action.payload.result.data };
          }
          return { ...city };
        });
      })
      .addCase(changeCityStatus.rejected, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.error = action.payload;
      })
      // get city by id case

      .addCase(getCityById.pending, (state) => {
        state.get_city_by_id.isLoading = true;
        state.get_city_by_id.error = null;
      })
      .addCase(getCityById.fulfilled, (state, action) => {
        state.get_city_by_id.isLoading = false;
        state.get_city_by_id.data = action.payload.result;
      })
      .addCase(getCityById.rejected, (state, action) => {
        state.get_city_by_id.isLoading = false;
        state.get_city_by_id.error = action.payload;
      })
      // update city case

      .addCase(updateCity.pending, (state) => {
        state.update_city.isLoading = true;
        state.update_city.error = null;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.update_city.isLoading = false;
        state.update_city.data = action.payload.result;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.update_city.isLoading = false;
        state.update_city.error = action.payload;
      })
      // post city case

      .addCase(postCity.pending, (state) => {
        state.post_city.isLoading = true;
        state.post_city.error = null;
      })
      .addCase(postCity.fulfilled, (state, action) => {
        state.post_city.isLoading = false;
        state.post_city.data = action.payload.result;
      })
      .addCase(postCity.rejected, (state, action) => {
        state.post_city.isLoading = false;
        state.post_city.error = action.payload?.error;
      });
  },
});

export const selectGetCities = (state) => state.city.get;
export const selectDeleteCity = (state) => state.city.delete;
export const selectChangeCityStatus = (state) => state.city.change_status;
export const selectGetCityById = (state) => state.city.get_city_by_id;
export const selectUpdateCity = (state) => state.city.update_city;
export const selectPostCity = (state) => state.city.post_city;

export default citySlice.reducer;
