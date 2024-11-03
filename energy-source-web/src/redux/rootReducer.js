// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import authenticationSlice from './slice/authSlice';
import sourceSlice from './slice/sourceSlice'
// Import other reducers if needed

// Combine reducers here
const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authenticationSlice,
  source: sourceSlice
  // Add other reducers here, e.g. `user: userReducer`
});

export default rootReducer;
