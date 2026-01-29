import { createSlice } from "@reduxjs/toolkit";
import {
  getSubCategory,
  getSubCategoryById,
} from "../../api/subCategoryAPI/subCategoryAPI";

export const subCategorySlice = createSlice({
  name: "subCategorySlice",
  initialState: {
    subCategory: [],
    subCategoryId: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategory.fulfilled, (state, actions) => {
        state.subCategory = actions.payload.data;
      })
      .addCase(getSubCategoryById.fulfilled, (state, actions) => {
        state.subCategoryId = actions.payload.data
      });
  },
});

export const {} = subCategorySlice.actions;

export default subCategorySlice.reducer;
