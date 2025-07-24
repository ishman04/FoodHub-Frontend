import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  ordersData: null,
  adminOrders: [],
  loading: false,
};

// Place new order
export const placeOrder = createAsyncThunk('/order/placeOrder', async (details, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/order/create`, details,{
      withCredentials:true
    });
    toast.success('Order created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong');
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

// Fetch all user orders
export const fetchAllOrders = createAsyncThunk('/order/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/order',{
      withCredentials:true
    });
    return res.data.data;
  } catch (error) {
    toast.error("Failed to fetch orders");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

// Fetch pending orders for admin
export const fetchPendingOrders = createAsyncThunk('/order/fetchPending', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/order/admin/pending-orders',{
      withCredentials:true
    });
    return res.data.data;
  } catch (error) {
    toast.error("Failed to fetch pending orders");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

// Fetch delivered orders for admin
export const fetchDeliveredOrders = createAsyncThunk('/order/fetchDelivered', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/order/admin/delivered-orders',{
      withCredentials:true
    });
    return res.data.data;
  } catch (error) {
    toast.error("Failed to fetch delivered orders");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

// Update order status
export const updateOrderStatus = createAsyncThunk('/order/updateStatus', async ({ orderId, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.patch(`/order/update/${orderId}/${status}`,{},{
      withCredentials:true
    });
    toast.success("Order status updated");
    thunkAPI.dispatch(fetchPendingOrders()); // Refresh pending orders after update
    return res.data;
  } catch (error) {
    toast.error("Failed to update status");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.ordersData = action.payload?.data;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.ordersData = action.payload;
      })
      .addCase(fetchPendingOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingOrders.fulfilled, (state, action) => {
        state.adminOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchPendingOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeliveredOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeliveredOrders.fulfilled, (state, action) => {
        state.adminOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchDeliveredOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default OrderSlice.reducer;
