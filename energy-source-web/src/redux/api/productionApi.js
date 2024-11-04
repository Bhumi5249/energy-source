import axiosInstance from '@/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addProduction = createAsyncThunk('production/addProduction', async ({ sourcesId, date, production }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance('/addProduction', 'POST', { sourcesId, date, production });
    dispatch(getProductionList())
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProductionList = createAsyncThunk('production/getProductionList', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance('/getProduction', 'GET');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProductionListByRange = createAsyncThunk('production/getProductionListByRange', async ({ startDate,endDate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/productions/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, 'GET');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const updateProduction = createAsyncThunk('production/updateProduction', async ({ id, ...data }, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/updateProduction/${id}`, 'PUT', data);
      dispatch(getProductionList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  export const deleteProduction = createAsyncThunk('production/deleteProduction', async (id, { dispatch,rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/deleteProduction/${id}`, 'DELETE');
      dispatch(getProductionList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });