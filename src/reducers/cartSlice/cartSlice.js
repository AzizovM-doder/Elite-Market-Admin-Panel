import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../../api/cartAPI/cartAPI";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart : [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, actions) =>{
        state.cart = actions.payload.data    })
  },
});
export const {} = cartSlice.actions;

export default cartSlice.reducer;
