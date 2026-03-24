import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/auth';

export const userApi = createApi({
  reducerPath: 'userApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/', credentials:'include' }),
 tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;