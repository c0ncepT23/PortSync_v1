// src/store/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types for our state
export interface User {
  id: string;
  username: string;
  phoneNumber?: string;
  workEmail?: string;
  designation?: string;
  organization?: string;
  profileCompleted: boolean;
  portfolioConnected: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User;
        token?: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, token, refreshToken } = action.payload;
      if (user) state.user = user;
      if (token) state.token = token;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = !!token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Remove token from AsyncStorage
      AsyncStorage.removeItem('userToken');
      
      // Trigger global refresh
      // @ts-ignore
      if (global.refreshAuthStatus) {
        // @ts-ignore
        global.refreshAuthStatus();
      }
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;