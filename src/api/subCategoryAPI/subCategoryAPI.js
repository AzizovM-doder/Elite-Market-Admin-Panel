import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";
import toast from "react-hot-toast";

export const getSubCategory = createAsyncThunk(
  "subCategorySlice/getSubCategory",
  async () => {
    try {
      const res = await toast.promise(
        apiInstance.get("SubCategory/get-sub-category"),
        {
          loading: "Loading sub categories...",
          // success: "Loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getSubCategoryById = createAsyncThunk(
  "brandSlice/getSubCategoryById",
  async (id) => {
    try {
      const res = await toast.promise(
        apiInstance.get(
          `SubCategory/get-sub-category-by-id?id=${id}`
        ),
        {
          loading: "Loading sub category...",
          // success: "Loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postSubCategory = createAsyncThunk(
  "brandSlice/postSubCategory",
  async (obj, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.post(
          `SubCategory/add-sub-category?CategoryId=${obj.id}&SubCategoryName=${obj.name}`
        ),
        {
          loading: "Adding...",
          success: "Added succesfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
    }
  }
);

export const putSubCategory = createAsyncThunk(
  "brandSlice/putSubCategory",
  async (obj, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.put(
          `SubCategory/update-sub-category?Id=${obj.id}&CategoryId=${obj.categoryId}&SubCategoryName=${obj.name}`
        ),
        {
          loading: "Updating...",
          success: "Edited succesfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "brandSlice/deleteSubCategory",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete(
          "SubCategory/delete-sub-category?id=" + id
        ),
        {
          loading: "Deleting...",
          success: "Deleted succesfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
    }
  }
);
