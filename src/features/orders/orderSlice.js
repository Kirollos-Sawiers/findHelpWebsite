import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';


export const calculateOrderPrice = createAsyncThunk(
  'order/calculate',
  async (orderData, { rejectWithValue }) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      const response = await instance.post(
        "api/v1/users/orders/calculate",
        orderData,
        { headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": "ar",
          "Authorization": `Bearer ${token}`,
          "Country-Id": 65,

        }, } 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const placeOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDetails, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await instance.post(
        "api/v1/users/orders/calculate",
        orderDetails,
        { headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": "ar",
          "Authorization": `Bearer ${token}`,
          "Country-Id": 65,

        }, } 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderPrice: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateOrderPrice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderPrice = action.payload;
      })
      .addCase(calculateOrderPrice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderPrice = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;