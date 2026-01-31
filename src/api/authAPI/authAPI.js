import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "@/utils/url";
import toast from "react-hot-toast";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user) => {
    try {
      const res = await toast.promise(
        apiInstance.post("/Account/login", user),
        {
          loading: "Signing in..."
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
