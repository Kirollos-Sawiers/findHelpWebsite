import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';

export const getAllCountries = createAsyncThunk(
    'user/country_location',
    async (_, { rejectWithValue }) => {
      try {
        const response = await instance.get("api/v1/meta/countries", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        });
        console.log(response);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


const locationSlice = createSlice({
  name: 'location',
  initialState: {
    allCountries: null,
    allCities: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.allCountries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default locationSlice.reducer;