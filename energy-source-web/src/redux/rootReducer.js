// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import authenticationSlice from './slice/authSlice';
// Import other reducers if needed

// Combine reducers here
const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authenticationSlice
  // Add other reducers here, e.g. `user: userReducer`
});

export default rootReducer;
