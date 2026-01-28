import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "../api";
import addToCartReducer from "./addToCart.reducer";

const rootReducer = combineReducers({
  rootApi: apiReducer.reducer,
  addToCartReducer: addToCartReducer.reducer,
});

export default rootReducer;