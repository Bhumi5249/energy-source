import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserToken } from "../slice/authSlice";
import Cookies from "js-cookie";

export const login = createAsyncThunk('auth/login', async ({ email, password, router },{dispatch,}) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn`, {email, password})
        if(response){
            dispatch(setUserToken(response?.data?.data?.accessToken))
            router.push('/dashboard')
        }
        Cookies.set("token", response?.data?.data?.accessToken, { expires: 1, secure: true, sameSite: 'Strict' })

      return response.data;
    } catch (error) {
        throw error.response.data;
    }
  });