import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const isAdded = state.cart.find(item => item.id === action.payload.id);
      if (isAdded) {
        alert("Product already added");
        return;
      }
      state.cart.push({ ...action.payload, quantity: 1 }); // Initialize quantity when added
    },
    removeProductFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload);
    },
    incProduct: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decProduct: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter(item => item.id !== action.payload);
        }
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart, incProduct, decProduct } = cartSlice.actions;
export default cartSlice.reducer;
