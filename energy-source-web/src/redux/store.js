// src/store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',             // Key for storage
  storage,                 // Define the storage
  whitelist: ['counter'],  // Specify which slices to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific redux-persist actions that contain non-serializable data
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
