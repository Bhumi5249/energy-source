import axiosInstance from '@/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addUser = createAsyncThunk('user/addUser', async ({ userName, email, password, roleId }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance('/addUser', 'POST', { userName, email, password, roleId });
    dispatch(getUser());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance('/getUser', 'GET');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getRoles = createAsyncThunk('user/getRoles', async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance('/getRoles', 'GET');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, ...data }, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/updateUser/${id}`, 'PUT', data);
      dispatch(getUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/deleteUser/${id}`, 'DELETE');
      dispatch(getUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });