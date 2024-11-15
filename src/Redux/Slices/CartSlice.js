import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    cartsData: ""
}

export const addProductToCart = createAsyncThunk('/cart/addProduct', async(productId)=>{
    try {
        const products = axiosInstance.post(`/carts/add/${productId}`);
        toast.promise(products, {
            loading: 'Adding product to cart',
            error: 'Something went wrong',
            success: 'Product added successfully to cart',
        });
        const apiResponse = await products;
        console.log("API Response:", apiResponse);
        return apiResponse.data
    } catch(error) {
        console.log("api",error);
        toast.error('Something went wrong');
    }
})

export const removeProductFromCart = createAsyncThunk('/cart/removeProduct', async(productId)=>{
    try {
        const products = axiosInstance.post(`/carts/remove/${productId}`);
        toast.promise(products, {
            loading: 'Removing product from cart',
            error: 'Something went wrong',
            success: 'Product removed successfully',
        });
        const apiResponse = await products;
        
        return apiResponse.data
    } catch(error) {
        console.log(error);
        toast.error('Something went wrong');
    }
})

export const getCartDetails = createAsyncThunk('/cart/getCart', async()=>{
    try {
        const products = axiosInstance.get(`/carts`);
        toast.promise(products, {
            loading: 'Loading cart',
            error: 'Something went wrong',
            success: 'Cart loaded successfully',
        });
        const apiResponse = await products;
        return apiResponse.data
    } catch(error) {
        console.log(error);
        toast.error('Something went wrong');
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getCartDetails.fulfilled, (state,action)=>{
            state.cartsData = action?.payload?.data
        })
        
    }
})

export default cartSlice.reducer;