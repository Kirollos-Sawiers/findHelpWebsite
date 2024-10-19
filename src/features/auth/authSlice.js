import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';


// Async Thunk for signup
export const signUpWeb = createAsyncThunk(
  'users/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await instance.post("api/v1/users/auth/signup", credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async Thunk for login
export const loginWeb = createAsyncThunk(
  'users/login',
  async (credentials, { rejectWithValue }) => {
    console.log(credentials)
    try {
      const response = await instance.post("api/v1/users/auth/login", credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const response = await instance.post("api/v1/users/auth/reset-password", credentials);
      console.log("يا عم احلى باسورد علييييك");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  'users/forgetPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const response = await instance.post("api/v1/users/auth/forgot", credentials);
      console.log("يسطى الباسورد اتغير تمااام");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for logout
export const logoutWeb = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpWeb.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpWeb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signUpWeb.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginWeb.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginWeb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginWeb.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        console.log("يسطى الباسورد اتغير تمااام");
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutWeb.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;