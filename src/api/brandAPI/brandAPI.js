import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";
import toast from "react-hot-toast";

export const getBrand = createAsyncThunk(
  "brandSlice/getColor",
  async (brandName) => {
    try {
      const res = await toast.promise(
        apiInstance("Brand/get-brands", {
          params: {
            BrandName: brandName || null,
          },
        }),
        {
          loading: "Loading brands...",
          // success: "Brands loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "brandSlice/getColorById",
  async (id) => {
    try {
      const res = await toast.promise(
        apiInstance(`Brand/get-brand-by-id?id=${id}`),
        {
          loading: "Loading brand...",
          // success: "Brand loaded",
          error: "Something went wrong!",
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postBrand = createAsyncThunk(
  "brandSlice/postBrand",
  async (name, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.post(`Brand/add-brand?BrandName=${name}`),
        {
          loading: "Adding brand...",
          success: `${name} added to brands successfully!`,
          error: "Something went wrong!",
        }
      );
      dispatch(getBrand());
    } catch (error) {
      console.error(error);
    }
  }
);

export const putBrand = createAsyncThunk(
  "brandSlice/putBrand",
  async (obj, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.put(
          `Brand/update-brand?Id=${obj.id}&BrandName=${obj.brandName}`
        ),
        {
          loading: "Updating brand...",
          success: "Brand edited successfully!",
          error: "Something went wrong!",
        }
      );
      dispatch(getBrand());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brandSlice/deleteBrand",
  async (id, { dispatch }) => {
    try {
      await toast.promise(
        axiosRequest.delete("Brand/delete-brand?id=" + id),
        {
          loading: "Deleting brand...",
          success: "Deleted successfully",
          error: "Something went wrong!",
        }
      );
      dispatch(getBrand());
    } catch (error) {
      console.error(error);
    }
  }
);
