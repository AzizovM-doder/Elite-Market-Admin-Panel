import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductById } from "../../api/products/productAPI";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    productById : {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, actions) => {
      state.products = actions.payload?.products 
      
    }).addCase(getProductById.fulfilled, (state, actions) => {
      state.productById = actions?.payload?.data
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
