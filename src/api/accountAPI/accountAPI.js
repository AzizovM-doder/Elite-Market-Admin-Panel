import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/url";
import toast from "react-hot-toast";

export const getUsers = createAsyncThunk(
  "accountSlice/getUsers",
  async (page) => {
    try {
      const res = await toast.promise(
        axiosRequest.get("UserProfile/get-user-profiles", {
          params: {
            PageNumber: page || 1,
          },
        }),
        {
          loading: "Loading users...",
          success: "Users loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUserById = createAsyncThunk(
  "accountSlice/getUserById",
  async (id) => {
    try {
      const res = await toast.promise(
        axiosRequest.get(
          `UserProfile/get-user-profile-by-id?id=${id}`
        ),
        {
          loading: "Loading profile...",
          // success: "User loaded",
          error: "Something went wrong!",
        }
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  "accountSlice/deleteUserProfile",
  async (id, {dispatch}) => {
    try {
      await toast.promise(
        axiosRequest.delete(
          `UserProfile/delete-user?id=${id}`
        ),
        {
          loading: "Deleting user...",
          // success: "User deleted successfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getUsers())
    } catch (error) {
      console.error(error);
    }
  }
);
