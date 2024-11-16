import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    productsData: [], // Array of products
}

export const getAllProducts = createAsyncThunk('/products/getAll', async () => {
    try {
        const products = axiosInstance.get('/product');
        toast.promise(products, {
            loading: 'Loading all the products',
            error: 'Something went wrong',
            success: 'Products loaded successfully',
        });
        const apiResponse = await products;
        return apiResponse.data
    } catch(error) {
        console.log(error);
        toast.error('Something went wrong');
    }
});

export const getProductDetails = createAsyncThunk('/products/getDetails', async(id)=>{
    try {
        const product = axiosInstance.get(`/product/${id}`);
        toast.promise(product, {
            loading: 'Loading the product',
            error: 'Something went wrong',
            success: 'Product loaded successfully',
        });
        const apiResponse = await product;
        return apiResponse.data
    } catch(error) {
        console.log(error);
        toast.error('Something went wrong');
    }
})

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.fulfilled, (state, action) => {
            console.log("action",action.payload);
            state.productsData = action?.payload?.data;
        });
    }
});

export default ProductSlice.reducer;