import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import restaurantsReducer from "./restaurants/restaurantsSlice"
import locationReducer from "./location/locationSlice"
import servicesReducer from "./service/ServicesSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    locationData: locationReducer,
    restaurantsData: restaurantsReducer,
    servicesData: servicesReducer,
  },
  devTools:true,
});
