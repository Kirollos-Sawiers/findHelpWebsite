import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import restaurantsReducer from "./restaurants/restaurantsSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurantsData: restaurantsReducer,
  },
  devTools:true,
});
