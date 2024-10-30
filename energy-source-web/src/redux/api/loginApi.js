import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserToken } from "../slice/authSlice";

export const login = createAsyncThunk('auth/login', async ({ email, password, router },{dispatch,}) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signIn`, {email, password})
        if(response){
            dispatch(setUserToken(response?.data?.data?.accessToken))
            router.push('/dashboard')
        }
      return response.data;
    } catch (error) {
        throw error.response.data;
    }
  });