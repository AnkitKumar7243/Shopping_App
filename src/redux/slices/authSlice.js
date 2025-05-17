import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Remove from localStorage
      localStorage.removeItem('user');
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  registerStart, 
  registerSuccess, 
  registerFailure,
  loadUser,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
