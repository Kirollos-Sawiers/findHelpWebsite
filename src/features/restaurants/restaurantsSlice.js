import { createSlice } from "@reduxjs/toolkit";
import {
  getAllRestaurants,
  getRestaurantCategoryData,
  getShopsCategoryData,
  getShopData,
  getAllRestaurantProductsData,
  getAllShops,
  getProductDetails,
  getRestaurantsByCategoryID,
  getShopsByCategoryID,
  filterRestaurantsByLocation,
} from "./restaurantsAPI";

const initialState = {
  restaurants: [],
  categories: [],
  shopData: [],
  products: {},
  productDetails: [],
  loading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(filterRestaurantsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterRestaurantsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(filterRestaurantsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRestaurantsByCategoryID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantsByCategoryID.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurantsByCategoryID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getShopsByCategoryID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopsByCategoryID.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getShopsByCategoryID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRestaurantCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getRestaurantCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getShopsCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopsCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getShopsCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getShopData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopData.fulfilled, (state, action) => {
        state.loading = false;
        state.shopData = action.payload;
      })
      .addCase(getShopData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllRestaurantProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllRestaurantProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;
