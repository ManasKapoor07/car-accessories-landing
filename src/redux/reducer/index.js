import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "../api";
import addToCartReducer from "./addToCart.reducer";
import userReducer from "./userReducer.reducer";


const rootReducer = combineReducers({
  rootApi: apiReducer.reducer,
  addToCartReducer: addToCartReducer.reducer,
  userSlice : userReducer.reducer,
});

export default rootReducer;