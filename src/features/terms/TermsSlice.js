import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';


export const getTermsData = createAsyncThunk(
  'terms/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        "api/v1/meta/pages",
        { headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": "ar",
          "Country-Id": 65,

        }, } 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const termsSlice = createSlice({
  name: 'order',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTermsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTermsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getTermsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default termsSlice.reducer;