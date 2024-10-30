// authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { login } from '../api/loginApi';

// Define the initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define the authentication slice
const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setUserToken: (state, action) => {
      state.token = action.payload
    },
    clearExtraReducers: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// Export actions and reducer
export const {  setUserData, setUserToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;
