import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRecordRequest } from '@/types/recordRequest';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const recordRequestApi = createApi({
  reducerPath: 'recordRequestApi',
  baseQuery,
  tagTypes: ['RecordRequest'],
  endpoints: (builder) => ({
    getRecordRequests: builder.query<IRecordRequest[], void>({
      query: () => '/requests',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'RecordRequest' as const, id: _id })),
              { type: 'RecordRequest', id: 'LIST' },
            ]
          : [{ type: 'RecordRequest', id: 'LIST' }],
    }),
    createRecordRequest: builder.mutation<IRecordRequest, Partial<IRecordRequest>>({
      query: (body) => ({
        url: '/requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'RecordRequest', id: 'LIST' }],
    }),
    approveRequest: builder.mutation<IRecordRequest, string>({
        query: (id) => ({
            url: `/requests/approve/${id}`,
            method: 'PUT',
        }),
        invalidatesTags: (result, error, id) => [{ type: 'RecordRequest', id }],
    }),
    rejectRequest: builder.mutation<IRecordRequest, string>({
        query: (id) => ({
            url: `/requests/reject/${id}`,
            method: 'PUT',
        }),
        invalidatesTags: (result, error, id) => [{ type: 'RecordRequest', id }],
    }),
  }),
});

export const {
  useGetRecordRequestsQuery,
  useCreateRecordRequestMutation,
  useApproveRequestMutation,
  useRejectRequestMutation,
} = recordRequestApi;
