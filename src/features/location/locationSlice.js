import { createSlice } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';
import { getAllCountries, getAllCities,getAllAreas } from "./locationAPI"


const initialState = {
  allCountriesData: [],
  allCitiesData: [],
  allAreasData: [],
  loading: false,
  error: null,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.allCountriesData = action.payload.data;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.loading = false;
        state.allCitiesData = action.payload.data;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.allAreasData = action.payload.data;
      })
      .addCase(getAllAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default locationSlice.reducer;