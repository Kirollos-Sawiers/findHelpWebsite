import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import restaurantsReducer from "./restaurants/restaurantsSlice"
import locationReducer from "./location/locationSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurantsData: restaurantsReducer,
    locationData: locationReducer,
  },
  devTools:true,
});
