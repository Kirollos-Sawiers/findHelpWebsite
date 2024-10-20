import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./../../axios/axios";

export const getAllServices = createAsyncThunk(
  "service/fetchData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await instance.get(`api/v1/users/services?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
          "Country-Id": 65,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const getServiceCategoryData = createAsyncThunk(
    "service/fetchCategoryData",
    async (_, { rejectWithValue }) => {
      try {
        const response = await instance.get("api/v1/meta/service_categories", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "ar",
            "Country-Id": 65,
          },
        });
        const data = await response.data;
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  export const getServicesByCategoryID = createAsyncThunk(
    "service/fetchServicesByCategoryId",
    async ({ page, selectedCategoryId }, { rejectWithValue }) => {
      console.log({ page, selectedCategoryId });
      try {
        const response = await instance.get(
          `api/v1/users/services?page=${page}&category_id=${selectedCategoryId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "ar",
            },
          }
        );
  
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  export const getServiceById = createAsyncThunk(
    "service/fetchServiceById",
    async ({ selectedServiceId }, { rejectWithValue }) => {
      try {
        const response = await instance.get(
          `api/v1/users/services/${selectedServiceId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "ar",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  export const placeService = createAsyncThunk(
    "service/createService",
    async ({ serviceData }, { rejectWithValue }) => {
      console.log(serviceData)
      // try {
      //   const response = await instance.post(
      //     `api/v1/users/orders`,
      //     serviceData,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         "Accept": "application/json",
      //         "Accept-Language": "ar",
      //       },
      //     }
      //   );
      //   return response.data;
      // } catch (error) {
      //   return rejectWithValue(error.response?.data?.message || error.message);
      // }
    }
  );