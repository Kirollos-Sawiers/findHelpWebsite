import { createSlice } from "@reduxjs/toolkit";
import { getAllServices, getServiceCategoryData, getServicesByCategoryID } from "./servicesAPI";

const initialState = {
  allServicesData: [],
  categories: [],
  shopData: [],
  products: {},
  productDetails: [],
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.allServicesData = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getServiceCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getServiceCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getServicesByCategoryID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicesByCategoryID.fulfilled, (state, action) => {
        state.loading = false;
        state.allServicesData = action.payload;
      })
      .addCase(getServicesByCategoryID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
