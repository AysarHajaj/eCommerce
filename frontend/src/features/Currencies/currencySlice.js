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
  get_currency_by_id: {
    data: {},
    isLoading: false,
    error: null,
  },
  update_currency: {
    data: {},
    isLoading: false,
    error: null,
  },
  post_currency: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const getCurrencies = createAsyncThunk(
  constants.ACTION_TYPES.currency.get_list,
  (_, { rejectWithValue }) =>
    api
      .getCurrencies()
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const deleteCurrency = createAsyncThunk(
  constants.ACTION_TYPES.currency.delete,
  (id, { rejectWithValue }) =>
    api
      .deleteCurrency(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const changeCurrencyStatus = createAsyncThunk(
  constants.ACTION_TYPES.currency.change_status,
  (id, { rejectWithValue }) =>
    api
      .changeCurrencyStatus(id)
      .then((response) => ({ data: response.data, id }))
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const getCurrencyById = createAsyncThunk(
  constants.ACTION_TYPES.currency.get,
  (id, { rejectWithValue }) =>
    api
      .getCurrencyById(id)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const updateCurrency = createAsyncThunk(
  constants.ACTION_TYPES.currency.put,
  (data, { rejectWithValue }) =>
    api
      .updateCurrency(data.id, data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const postCurrency = createAsyncThunk(
  constants.ACTION_TYPES.currency.post,
  (data, { rejectWithValue }) =>
    api
      .postCurrency(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data)),
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get currencies case
      .addCase(getCurrencies.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload;
      })

      // delete currency case

      .addCase(deleteCurrency.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.error = null;
      })
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload.result;
        state.get.data = state.get.data.filter((currency) => currency.id !== action.payload.id);
      })
      .addCase(deleteCurrency.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.error = action.payload;
      })
      // change currency status case

      .addCase(changeCurrencyStatus.pending, (state) => {
        state.change_status.isLoading = true;
        state.change_status.error = null;
      })
      .addCase(changeCurrencyStatus.fulfilled, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.data = action.payload.result;
        state.get.data = state.get.data.map((currency) => {
          if (currency.id === action.payload.id) {
            return { ...currency, deactivated_at: action.payload.result.data };
          }
          return { ...currency };
        });
      })
      .addCase(changeCurrencyStatus.rejected, (state, action) => {
        state.change_status.isLoading = false;
        state.change_status.error = action.payload;
      })
      // get currency by id case

      .addCase(getCurrencyById.pending, (state) => {
        state.get_currency_by_id.isLoading = true;
        state.get_currency_by_id.error = null;
      })
      .addCase(getCurrencyById.fulfilled, (state, action) => {
        state.get_currency_by_id.isLoading = false;
        state.get_currency_by_id.data = action.payload.result;
      })
      .addCase(getCurrencyById.rejected, (state, action) => {
        state.get_currency_by_id.isLoading = false;
        state.get_currency_by_id.error = action.payload;
      })
      // update currency case

      .addCase(updateCurrency.pending, (state) => {
        state.update_currency.isLoading = true;
        state.update_currency.error = null;
      })
      .addCase(updateCurrency.fulfilled, (state, action) => {
        state.update_currency.isLoading = false;
        state.update_currency.data = action.payload.result;
      })
      .addCase(updateCurrency.rejected, (state, action) => {
        state.update_currency.isLoading = false;
        state.update_currency.error = action.payload;
      })
      // post currency case

      .addCase(postCurrency.pending, (state) => {
        state.post_currency.isLoading = true;
        state.post_currency.error = null;
      })
      .addCase(postCurrency.fulfilled, (state, action) => {
        state.post_currency.isLoading = false;
        state.post_currency.data = action.payload.result;
      })
      .addCase(postCurrency.rejected, (state, action) => {
        state.post_currency.isLoading = false;
        state.post_currency.error = action.payload?.error;
      });
  },
});

export const selectGetCurrencies = (state) => state.currency.get;
export const selectDeleteCurrency = (state) => state.currency.delete;
export const selectChangeCurrencyStatus = (state) => state.currency.change_status;
export const selectGetCurrencyById = (state) => state.currency.get_currency_by_id;
export const selectUpdateCurrency = (state) => state.currency.update_currency;
export const selectPostCurrency = (state) => state.currency.post_currency;

export default currencySlice.reducer;
