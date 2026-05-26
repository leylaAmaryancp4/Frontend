import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a placeholder type for a Diagnosis
// TODO: Replace with a proper type definition in '@/types/diagnosis'
export type Diagnosis = any;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const diagnosisApi = createApi({
  reducerPath: 'diagnosisApi',
  baseQuery,
  tagTypes: ['Diagnosis'],
  endpoints: (builder) => ({
    getDiagnosesByRecord: builder.query<Diagnosis[], string>({
      query: (medicalRecordId) => `/diagnoses/record/${medicalRecordId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Diagnosis' as const, id })),
              { type: 'Diagnosis', id: 'LIST' },
            ]
          : [{ type: 'Diagnosis', id: 'LIST' }],
    }),
    createDiagnosis: builder.mutation<Diagnosis, Partial<Diagnosis>>({
      query: (body) => ({
        url: '/diagnoses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Diagnosis', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDiagnosesByRecordQuery,
  useCreateDiagnosisMutation,
} = diagnosisApi;
