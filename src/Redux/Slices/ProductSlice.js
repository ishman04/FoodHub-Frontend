import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    productsData: [], // Array of products
}

export const getAllProducts = createAsyncThunk('/products/getAll', async () => {
    const response = await axiosInstance.get('/product');
    
    // Handle toast separately from the data flow
    toast.promise(Promise.resolve(response), {
        loading: 'Loading all the products',
        error: 'Something went wrong, cannot load products',
        success: 'Products loaded successfully',
    });
    
    return response.data;
});

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {builder
    .addCase(getAllProducts.pending, (state) => {
        console.log('Loading products...');
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.productsData = action?.payload?.data;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
        console.log('Error loading products:', action.error);
        toast.error('Something went wrong');
    });
}
});

export default ProductSlice.reducer;