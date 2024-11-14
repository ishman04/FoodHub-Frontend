import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') === 'true' || 'false',
    role: localStorage.getItem('role') || '',
    data: ('data', {}),
}

// Thunk => asyncronous action

export const createAccount = createAsyncThunk('/auth/createAccount', async(data) => {
    console.log("incoming data to the thunk", data)
    try {
       const response = axiosInstance.post('/users', data)
       toast.promise(response, {
        success: (resolvedPromise) => {
            return resolvedPromise?.data?.message;
        },
        loading: 'Hold back tight, we are registering your id',
        error: 'Oh no !, something went wrong. Please try again'
       })
       const apiResponse = await response
       return apiResponse
    } catch (error) {
        console.log(error)
    }
})

export const login = createAsyncThunk('/auth/login', async(data) => {
    try {
        const response = axiosInstance.post('/auth/login', data);
        toast.promise(response, {
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message
            },
            loading: 'Logging you in...',
            error: 'Login failed. Please try again'
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        // Handle error properly
        console.log(error)
    }
});

export const logout = createAsyncThunk('/auth/logout', async() => {
    try {
        const response = axiosInstance.post('/auth/logout');
        toast.promise(response, {
            success: (resolvedPromise) => resolvedPromise?.data?.message,
            loading: 'Logging out...',
            error: 'Logout failed. Please try again'
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        console.log(error)
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
        })
        .addCase(logout.fulfilled,(state,action)=>{
            localStorage.setItem('isLoggedIn',false)
            localStorage.setItem('role','')
            localStorage.setItem('data',JSON.stringify({}))
            state.isLoggedIn = false
            state.role = ''
            state.data = {}
        })
    }
})

export default AuthSlice.reducer;