import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { clearLocation } from "./LocationSlice";

const initialState = {
    isLoggedIn: (() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const loginTime = localStorage.getItem('loginTime');
        const oneHour = 60 * 60 * 1000;

        if (isLoggedIn && loginTime && (Date.now() - Number(loginTime)) < oneHour) {
            return true;
        }

        // If login time is expired, clear local storage
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('selectedAddress')
        
        return false;
    })(),
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {},
};

export const createAccount = createAsyncThunk('/auth/createAccount', async (data) => {
    console.log("incoming data to the thunk", data);
    try {
        const response = axiosInstance.post('/users', data);
        toast.promise(response, {
            success: (resolvedPromise) => resolvedPromise?.data?.message,
            loading: 'Hold back tight, we are registering your ID',
            error: 'Oh no! Something went wrong. Please try again.',
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        console.log(error);
    }
});

export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        const response = axiosInstance.post('/auth/login', data);
        toast.promise(response, {
            success: (resolvedPromise) => resolvedPromise?.data?.message,
            loading: 'Logging you in...',
            error: 'Login failed. Please try again.',
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        console.log(error);
    }
});

export const logout = createAsyncThunk('/auth/logout', async (_,thunkAPI) => {
    try {
        const response = axiosInstance.post('/auth/logout');
        toast.promise(response, {
            success: (resolvedPromise) => resolvedPromise?.data?.message,
            loading: 'Logging out...',
            error: 'Logout failed. Please try again.',
        });
        const apiResponse = await response;
        thunkAPI.dispatch(clearLocation())
        return apiResponse;
    } catch (error) {
        console.log(error);
    }
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const userRole = action?.payload?.data?.data?.userRole || '';
                const userData = action?.payload?.data?.data?.userData || {};

                state.isLoggedIn = true;
                state.role = userRole;
                state.data = userData;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', userRole);
                localStorage.setItem('data', JSON.stringify(userData));
                localStorage.setItem('loginTime', Date.now().toString()); // Store login timestamp
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('role', '');
                localStorage.setItem('data', JSON.stringify({}));
                localStorage.removeItem('loginTime'); // Remove login timestamp
                localStorage.removeItem('selectedAddress')
                state.isLoggedIn = false;
                state.role = '';
                state.data = {};
            });
    },
});

export default AuthSlice.reducer;
