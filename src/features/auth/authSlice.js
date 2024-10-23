import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios';


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

export const loginWeb = createAsyncThunk(
  'users/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await instance.post("api/v1/users/auth/login", credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'users/updateUser',
  async (newUserData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await instance.post("api/v1/users/auth/update", newUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addUserAddress = createAsyncThunk(
  'users/addUserAddress',
  async (addressData, { rejectWithValue }) => {
    console.log(addressData)
    try {
      const token = localStorage.getItem('token');
      const response = await instance.post("api/v1/users/addresses",addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserSavedAddresses = createAsyncThunk(
  'users/fetchUserAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await instance.get("api/v1/users/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUserAddress = createAsyncThunk(
  'users/deleteUserAddress',
  async (address_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await instance.delete(`api/v1/users/addresses/${address_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await instance.post("api/v1/users/auth/forgot", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
    addresses: [],
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
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserSavedAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserSavedAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(getUserSavedAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
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