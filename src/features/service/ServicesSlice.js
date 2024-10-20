import { createSlice } from "@reduxjs/toolkit";
import { getAllServices, getServiceCategoryData, getServicesByCategoryID, getServiceById, placeService } from "./servicesAPI";

const initialState = {
  allServicesData: [],
  categories: [],
  serviceData: [],
  placeServiceRespnse: [],
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
      })
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceData = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(placeService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeService.fulfilled, (state, action) => {
        state.loading = false;
        state.placeServiceRespnse = action.payload;
      })
      .addCase(placeService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
