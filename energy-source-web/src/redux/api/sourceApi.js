import axiosInstance from '@/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addSource = createAsyncThunk('source/addSource', async ({ name, type, capacity }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance('/addSource', 'POST', { name, type, capacity });
    dispatch(getSourceList())
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getSourceList = createAsyncThunk('source/getSourceList', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance('/getSource', 'GET');
    console.log(response,"response")
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateSource = createAsyncThunk('source/updateSource', async ({ id, ...data }, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/updateSource/${id}`, 'PUT', data);
      dispatch(getSourceList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  export const deleteSource = createAsyncThunk('source/deleteSource', async (id, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/deleteSource/${id}`, 'DELETE');
      dispatch(getSourceList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });