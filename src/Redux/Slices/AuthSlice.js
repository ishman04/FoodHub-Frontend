// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../helpers/axiosInstance";
// import toast from "react-hot-toast";

// const initialState = {
//     isLoggedIn : localStorage.getItem('isLoggedIn') === 'true' || false,
//     role: localStorage.getItem('role') || '',
//     data: ('data', {}),
// }

// // Flow for async requests in redux toolkit :
// // Component Dispatches a Thunk (loginUser(loginData))
// // This happens when a user triggers an event (like a login).
// // Thunk Performs Async Operation (e.g., API Call)
// // On success, it returns data as action.payload.
// // On failure, it returns an error as action.error.
// // extraReducers Handle Thunk States
// // Pending: Set loading state.
// // Fulfilled: Update the store with successful data, clear loading.
// // Rejected: Capture error, clear loading.
// // Store Updates, Components Re-render
// // useSelector hooks read the updated state, and components reflect changes.

// // Flow for sync requests using redux toolkit :
// // Component Dispatches a Synchronous Action
// // Triggered by user input, an event, or a UI action.
// // Reducer Defined in Slice Updates State Immediately
// // Reducers in the slice handle this state update directly (no async lifecycle actions are needed).
// // Store Notifies Components of State Change
// // Components using useSelector are automatically re-rendered with the updated state.

// // We have jwt token stored in a cookie in the backend and have loggedin state stored in local storage. It allows us to stay logged in even if browser is closed. we stay logged in until jwt expires or user logs out manually 
// export const createAccount = createAsyncThunk('/auth/createAccount', async(data) => {
//     console.log("incoming data to the thunk", data)
//     try {
//        const response = axiosInstance.post('/users', data)
//        toast.promise(response, {
//         success: (resolvedPromise) => {
//             return resolvedPromise?.data?.message;
//         },
//         loading: 'Hold back tight, we are registering your id',
//         error: 'Oh no !, something went wrong. Please try again'
//        })
//        const apiResponse = await response
//        return apiResponse
//     } catch (error) {
//         console.log(error)
//     }
// })

// export const login = createAsyncThunk('/auth/login', async(data) => {
//     try {
//         const response = axiosInstance.post('/auth/login', data);
//         toast.promise(response, {
//             success: (resolvedPromise) => {
//                 return resolvedPromise?.data?.message
//             },
//             loading: 'Logging you in...',
//             error: 'Login failed. Please try again'
//         });
//         const apiResponse = await response;
//         return apiResponse;
//     } catch (error) {
//         // Handle error properly
//         console.log(error)
//     }
// });

// export const logout = createAsyncThunk('/auth/logout', async() => {
//     try {
//         const response = axiosInstance.post('/auth/logout');
//         toast.promise(response, {
//             success: (resolvedPromise) => resolvedPromise?.data?.message,
//             loading: 'Logging out...',
//             error: 'Logout failed. Please try again'
//         });
//         const apiResponse = await response;
//         return apiResponse;
//     } catch (error) {
//         console.log(error)
//     }
// });


// const AuthSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(login.fulfilled, (state, action) => {
//             const userRole = action?.payload?.data?.data?.userRole || '';
//             const userData = action?.payload?.data?.data?.userData || {};
        
//             state.isLoggedIn = true;
//             state.role = userRole;
//             state.data = userData;
        
//             localStorage.setItem('isLoggedIn', 'true');
//             localStorage.setItem('role', userRole);
//             localStorage.setItem('data', JSON.stringify(userData));
//         })
//         .addCase(logout.fulfilled,(state,action)=>{
//             localStorage.setItem('isLoggedIn',false)
//             localStorage.setItem('role','')
//             localStorage.setItem('data',JSON.stringify({}))
//             state.isLoggedIn = false
//             state.role = ''
//             state.data = {}
//         })
//     }
// })

// export default AuthSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

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

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        const response = axiosInstance.post('/auth/logout');
        toast.promise(response, {
            success: (resolvedPromise) => resolvedPromise?.data?.message,
            loading: 'Logging out...',
            error: 'Logout failed. Please try again.',
        });
        const apiResponse = await response;
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
                state.isLoggedIn = false;
                state.role = '';
                state.data = {};
            });
    },
});

export default AuthSlice.reducer;
