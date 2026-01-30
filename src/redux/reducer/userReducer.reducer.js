import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
  name: "userReducer",
  initialState: {
    currentUser: [],
  },
  reducers: {
    setUser: (state, action) => {
        console.log("Setting user:", action.payload );
        
      state.currentUser = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice;
