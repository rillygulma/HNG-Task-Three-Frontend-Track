import { configureStore } from "@reduxjs/toolkit";
import cartReduer from "./features/cartSlice"
const store = configureStore({
    reducer : cartReduer
});

export default store;