import { createSlice } from "@reduxjs/toolkit";
import { getBrand, getBrandById } from "../../api/brandAPI/brandAPI";
import toast from "react-hot-toast";

export const brandSlice = createSlice({
  name: "brandSlice",
  initialState: {
    brand : [],
    brandById : {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrand.fulfilled, (state, actions) =>{
        state.brand = actions.payload.data
    }).addCase(getBrandById.fulfilled, (state, actions) =>{
        state.brandById = actions.payload.data
    })},
});
export const {} = brandSlice.actions;

export default brandSlice.reducer;
