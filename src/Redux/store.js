import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from './Slices/AuthSlice'
import ProductSliceReducer from "./Slices/ProductSlice"
import CartSliceReducer from "./Slices/CartSlice"
import LocationSliceReducer from "./Slices/LocationSlice"
import OrderSliceReducer from "./Slices/OrderSlice"

export const store = configureStore({
    reducer:{
        auth: AuthSliceReducer,
        product: ProductSliceReducer,
        cart: CartSliceReducer,
        location: LocationSliceReducer,
        order: OrderSliceReducer
    },
    devTools: true
})