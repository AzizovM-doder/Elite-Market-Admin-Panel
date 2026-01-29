import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest, putFunction } from "@/utils/url";
import toast from "react-hot-toast";
export const getProductById = createAsyncThunk(
  "productSlice/getProductById",
  async (id) => {
    try {
      const res = await toast.promise(
        apiInstance.get(`Product/get-product-by-id?id=${id}`),
        {
          loading: "Loading product...",
          // success: "Product j",
          error: "Failed to load product!",
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
    }
  },
);

export const getProduct = createAsyncThunk(
  "productSlice/getProduct",
  async () => {
    try {
      const res = await toast.promise(apiInstance.get("Product/get-products"), {
        loading: "Loading products...",
        // success: "Products loaded",
        error: "Something went wrong!",
      });
      return res.data.data;
    } catch (err) {
      console.error(err);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "productSlice/deleteProduct",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete("Product/delete-product?id=" + id),
        {
          loading: "Deleting...",
          success: "Deleted successfully!",
          error: "Delete failed!",
        },
      );
      dispatch(getProduct());
    } catch (err) {
      console.error(err);
    }
  },
);

export const deleteProductImg = createAsyncThunk(
  "productSlice/deleteProductImg",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete("Product/delete-image-from-product?imageId=" + id),
        {
          loading: "Deleting image...",
          success: "Image deleted!",
          error: "Delete failed!",
        },
      );
      dispatch(getProduct());
    } catch (err) {
      console.error(err);
    }
  },
);

export const postProduct = createAsyncThunk(
  "productSlice/postProduct",
  async (formData, { dispatch }) => {
    try {
      await toast.promise(axiosRequest.post("Product/add-product", formData), {
        loading: "Adding product...",
        success: "Added successfully!",
        error: "Add failed!",
      });
      dispatch(getProduct());
    } catch (err) {
      console.error(err);
    }
  },
);

export const postImagesToProduct = createAsyncThunk(
  "productSlice/postImagesToProduct",
  async (formData, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.post("Product/add-image-to-product", formData),
        {
          loading: "Uploading image...",
          success: "Image added!",
          error: "Upload failed!",
        },
      );
      dispatch(getProduct());
    } catch (err) {
      console.error(err);
    }
  },
);

export const putProduct = createAsyncThunk(
  "productSlice/putProduct",
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      await toast.promise(putFunction("Product/update-product", obj), {
        loading: "Updating...",
        success: "Edited successfully!",
        error: "Update failed!",
      });
      dispatch(getProduct());
    } catch (err) {
      console.error(err);
    }
  },
);
