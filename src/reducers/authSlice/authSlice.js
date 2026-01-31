import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authAPI/authAPI";
import { setToken } from "../../utils/url";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, actions) => {
      const p = jwtDecode(actions.payload.data);
      const role =
        p["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role == "Admin" || role == "SuperAdmin") {
        setToken(actions.payload.data);
        toast.success('Logged successfully!')
      }
      else{
        toast.error("Need to be an admin!")
      }
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
