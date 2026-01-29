import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authAPI/authAPI";
import { setToken } from "../../utils/url";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, actions) => {
        setToken(actions.payload.data);
      })
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
