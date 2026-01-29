import { createSlice } from "@reduxjs/toolkit";
import { getColor, getColorById } from "../../api/colorAPI/colorAPI";
import toast from "react-hot-toast";

export const colorSlice = createSlice({
  name: "colorSlice",
  initialState: {
    color: [],
    colorId: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColor.fulfilled, (state, actions) => {
        state.color = actions.payload?.data;
      })
      .addCase(getColorById.fulfilled, (state, actions) => {
        state.colorId  = actions.payload?.data
        
      });
  },
});
export const {} = colorSlice.actions;

export default colorSlice.reducer;
