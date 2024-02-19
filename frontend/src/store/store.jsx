import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import userReducer from './userSlice';

const store = configureStore({
    reducer : {
        cart : cartReducer,
        filter : filterReducer,
        user : userReducer,
    }
})

export default store;