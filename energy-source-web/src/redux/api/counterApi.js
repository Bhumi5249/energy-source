
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios/index'

export const getBatch = createAsyncThunk('batch/getBatch', async (filters) => {
    try {
       await axiosInstance(`/banner/getBanner`, 'get')

      } catch (error) {
        console.error('Error get category:', error)
      }
  })