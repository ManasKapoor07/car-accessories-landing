import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
  name: "addToCartReducer",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId,
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item,
        );
      } else {
        state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: quantity } : item,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItemFromCart: (state, action) => {
      const idToRemove = action.payload.productId || action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== idToRemove,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItemToCart, updateQuantity, removeItemFromCart, clearCart } =
  addToCartSlice.actions;
export default addToCartSlice;
