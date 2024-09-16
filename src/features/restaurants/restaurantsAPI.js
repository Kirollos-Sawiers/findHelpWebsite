import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./../../axios/axios";

export const getAllRestaurants = createAsyncThunk(
  "restaurants/fetchData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await instance.get(`api/v1/users/shops?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const getAllShops = createAsyncThunk(
  "shops/fetchData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `api/v1/users/shops?type=shop&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
export const getRestaurantCategoryData = createAsyncThunk(
  "restaurants/fetchCategoryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("api/v1/meta/restaurant_categories", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getShopsCategoryData = createAsyncThunk(
  "shops/fetchCategoryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("api/v1/meta/store_categories", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getShopData = createAsyncThunk(
  "shop/shopDetailsData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `api/v1/users/shops/${params.shop_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllRestaurantProductsData = createAsyncThunk(
  "restaurantProducts/fetchAllRestaurantProductsData",
  async (params, { rejectWithValue }) => {
    let response;
    try {
      if (params.category_id === undefined) {
        response = await instance.get(
          `api/v1/users/products?shop_id=${params.shop_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": "ar",
            },
          }
        );
      } else {
        response = await instance.get(
          `api/v1/users/products?shop_id=${params.shop_id}&category_id=${params?.category_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": "ar",
            },
          }
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "Product/fetchProductDetails",
  async (params, { rejectWithValue }) => {
    console.log(params)
    try {
      const response = await instance.get(
        `api/v1/users/products?shop_id=${params.shop_id}&category_id=${params?.category_id}&ids=${params?.product_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
