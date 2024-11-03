// src/app/layout.js
'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store';
import './globals.css';
import ProtectedRoute from '@/route/ProtectedRoute';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ProtectedRoute>{children}</ProtectedRoute>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}