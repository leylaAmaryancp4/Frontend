import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';
import { setUser, logOut } from './slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user)); //Redux populated immediately
        } catch (err) {
          console.error('Registration failed:', err);
        }
      },
    }),

    me: builder.query<{ user: AuthResponse['user'] }, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (_err) {
          // not logged in; ignore
        }
      },
    }),
  }), 
}); 

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;