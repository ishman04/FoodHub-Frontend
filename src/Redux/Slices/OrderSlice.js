import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    ordersData: null
}

export const placeOrder = createAsyncThunk('/order/placeOrder', async (details, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/order/create`,details);
        toast.success('Order created successfully');
        return response.data; // Only return the data object
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

export const fetchAllOrders = createAsyncThunk(
  '/order/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/order');
      return res.data.data;
    } catch (error) {
      toast.error("Failed to fetch orders");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);


const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.ordersData = action.payload?.data;
        })
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
  state.ordersData = action.payload;
});
    },
});

export default OrderSlice.reducer;
