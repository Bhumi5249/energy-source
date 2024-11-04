// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authenticationSlice from './slice/authSlice';
import sourceSlice from './slice/sourceSlice'
import productionSlice from './slice/productionSlice'
import userSlice from './slice/userSlice'
// Import other reducers if needed

// Combine reducers here
const rootReducer = combineReducers({
  auth: authenticationSlice,
  source: sourceSlice,
  production: productionSlice,
  user: userSlice
  // Add other reducers here, e.g. `user: userReducer`
});

export default rootReducer;
