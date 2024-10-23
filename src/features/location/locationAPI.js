import { createAsyncThunk } from "@reduxjs/toolkit";
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
        const { headers,config, ...countries } = response;
        console.log(countries)
        return countries;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
export const getAllCities = createAsyncThunk(
    'user/city_location',
    async (country_id, { rejectWithValue }) => {
      try {
        const response = await instance.get(`api/v1/meta/cities/${country_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        });
        const { headers,config, ...cities } = response;
        return cities;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
export const getAllAreas = createAsyncThunk(
    'user/area_location',
    async (city_id, { rejectWithValue }) => {
      try {
        const response = await instance.get(`api/v1/meta/areas/${city_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        });
        const { headers,config, ...areas } = response;
        return areas;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );