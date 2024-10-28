// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
// Import other reducers if needed

// Combine reducers here
const rootReducer = combineReducers({
  counter: counterReducer,
  // Add other reducers here, e.g. `user: userReducer`
});

export default rootReducer;
