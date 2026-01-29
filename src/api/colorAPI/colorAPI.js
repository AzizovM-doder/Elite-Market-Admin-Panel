import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";
import toast from "react-hot-toast";

export const getColor = createAsyncThunk(
  "colorSlice/getColor",
  async (colorName) => {
    const res = await toast.promise(
      apiInstance("Color/get-colors", {
        params: {
          ColorName: colorName || null,
        },
      }),
      {
        loading: "Loading colors...",
        // success: "Colors loaded",
        error: "Something went wrong!",
      }
    );
    return res.data;
  }
);

export const getColorById = createAsyncThunk(
  "colorSlice/getColorById",
  async (id) => {
    const res = await toast.promise(
      apiInstance(`Color/get-color-by-id?id=${id}`),
      {
        loading: "Loading color...",
        // success: "Color loaded",
        error: "Something went wrong!",
      }
    );
    return res.data;
  }
);

export const postColor = createAsyncThunk(
  "colorSlice/postColor",
  async (name, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.post(`Color/add-color?ColorName=${name}`),
        {
          loading: "Adding color...",
          success: `Color ${name} added succesfully!`,
          error: "Something went wrong, try again!",
        }
      );
      dispatch(getColor());
    } catch (error) {
      console.error(error);
    }
  }
);

export const putColor = createAsyncThunk(
  "colorSlice/putColor",
  async (obj, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.put(
          `Color/update-color?Id=${obj.id}&ColorName=${"" +
            obj?.colorName?.replace("#", "%23")}`
        ),
        {
          loading: "Updating color...",
          success: "Color edited successfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getColor());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colorSlice/deleteColor",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete("Color/delete-color?id=" + id),
        {
          loading: "Deleting color...",
          success: "Color deleted successfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getColor());
    } catch (error) {
      console.error(error);
    }
  }
);
