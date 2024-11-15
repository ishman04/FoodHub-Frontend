import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    ordersData: null
}

export const placeOrder = createAsyncThunk('/order/placeOrder', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/order/create`);
        toast.success('Order created successfully');
        return response.data; // Only return the data object
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.ordersData = action.payload?.data;
        });
    },
});

export default OrderSlice.reducer;
