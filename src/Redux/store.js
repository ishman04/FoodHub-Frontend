import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from './Slices/AuthSlice'
import ProductSliceReducer from "./Slices/ProductSlice"
import CartSliceReducer from "./Slices/CartSlice"
import LocationSliceReducer from "./Slices/LocationSlice"

export const store = configureStore({
    reducer:{
        auth: AuthSliceReducer,
        product: ProductSliceReducer,
        cart: CartSliceReducer,
        location: LocationSliceReducer
    },
    devTools: true
})