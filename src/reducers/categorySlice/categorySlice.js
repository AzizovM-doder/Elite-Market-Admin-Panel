import { createSlice } from "@reduxjs/toolkit";
import { getCategory, getCategoryById } from "../../api/categoryAPI/categoryAPI";

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    category: [],
    categoryID: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, actions) => {
      state.category = actions.payload?.data;
    }).addCase(getCategoryById.fulfilled, (state, actions) => {
      state.categoryID = actions.payload?.data       
      ;
    });
  },
});
export const {} = categorySlice.actions;

export default categorySlice.reducer;
