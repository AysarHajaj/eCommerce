import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  login: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export const login = createAsyncThunk("login", (data, { rejectWithValue }) =>
  api
    .login(data)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error?.response?.data))
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.login.data = { token: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder

      // login case

      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.data = action.payload;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.error = action.payload.error;
      });
  },
});

export const selectLogin = (state) => state.login.login;
export const { setToken } = loginSlice.actions;

export default loginSlice.reducer;
