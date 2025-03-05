// src/store/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { User, setCredentials, clearCredentials } from '../slices/authSlice';

// Define the base API URL - you'll need to update this with your actual API endpoint
const API_URL = 'https://api.portsync.com';

interface AuthResponse {
  token: string;
  refreshToken?: string;
  user?: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/auth`,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Request phone OTP
    requestPhoneOtp: builder.mutation<{ success: boolean }, { phoneNumber: string }>({
      query: (credentials) => ({
        url: '/phone/request-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Verify phone OTP
    verifyPhoneOtp: builder.mutation<AuthResponse, { phoneNumber: string; otp: string }>({
      query: (credentials) => ({
        url: '/phone/verify-otp',
        method: 'POST',
        body: credentials,
      }),
      // Update state on successful authentication
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user,
          }));
        } catch {
          // Handle error if needed
        }
      },
    }),
    
    // Get current user
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
    }),
    
    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      // Clear credentials on logout
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
        } catch {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const {
  useRequestPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;