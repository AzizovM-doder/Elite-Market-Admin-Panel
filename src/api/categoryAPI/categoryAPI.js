import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";
import toast from "react-hot-toast";

export const getCategory = createAsyncThunk(
  "catogorySlice/getCategory",
  async () => {
    try {
      const res = await toast.promise(
        apiInstance("Category/get-categories"),
        {
          loading: "Loading categories...",
          // success: "Categories loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "catogorySlice/getCategoryById",
  async (id) => {
    try {
      const res = await toast.promise(
        apiInstance(`Category/get-category-by-id?id=${id}`),
        {
          loading: "Loading category...",
          // success: "Category loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postCategory = createAsyncThunk(
  "catogorySlice/postCategory",
  async (formData, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.post("Category/add-category", formData),
        {
          loading: "Adding category...",
          success: "Successfully added!",
          error: "Something went wrong!",
        }
      );
      dispatch(getCategory());
    } catch (error) {
      console.error(error);
    }
  }
);

export const putCategory = createAsyncThunk(
  "catogorySlice/putCategory",
  async (formData, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.put("Category/update-category", formData),
        {
          loading: "Updating category...",
          success: "Successfully edited!",
          error: "Something went wrong!",
        }
      );
      dispatch(getCategory());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "catogorySlice/deleteCategory",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete("Category/delete-category?id=" + id),
        {
          loading: "Deleting category...",
          success: "Successfully deleted!",
          error: "Something went wrong!",
        }
      );
      dispatch(getCategory());
    } catch (error) {
      console.error(error);
    }
  }
);
