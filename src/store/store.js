import { configureStore } from "@reduxjs/toolkit";
import CartReducer from '../slices/CartSlice'
export default configureStore({
    reducer:{
        cart:CartReducer
    }
})