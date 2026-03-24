import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a placeholder type for a Medical Record
// TODO: Replace with a proper type definition in '@/types/medicalRecord'
export type MedicalRecord = any;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const medicalRecordApi = createApi({
  reducerPath: 'medicalRecordApi',
  baseQuery,
  tagTypes: ['MedicalRecord'],
  endpoints: (builder) => ({
    getMedicalRecordsByPatient: builder.query<MedicalRecord[], string>({
      query: (patientId) => `/records/patient/${patientId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'MedicalRecord' as const, id })),
              { type: 'MedicalRecord', id: 'LIST' },
            ]
          : [{ type: 'MedicalRecord', id: 'LIST' }],
    }),
    getMedicalRecordById: builder.query<MedicalRecord, string>({
      query: (id) => `/records/${id}`,
      providesTags: (result, error, id) => [{ type: 'MedicalRecord', id }],
    }),
    createMedicalRecord: builder.mutation<MedicalRecord, Partial<MedicalRecord>>({
      query: (body) => ({
        url: '/records',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'MedicalRecord', id: 'LIST' }],
    }),
    updateMedicalRecord: builder.mutation<MedicalRecord, Partial<MedicalRecord>>({
      query: ({ id, ...patch }) => ({
        url: `/records/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'MedicalRecord', id }],
    }),
    deleteMedicalRecord: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'MedicalRecord', id }],
    }),
  }),
});

export const {
  useGetMedicalRecordsByPatientQuery,
  useGetMedicalRecordByIdQuery,
  useCreateMedicalRecordMutation,
  useUpdateMedicalRecordMutation,
  useDeleteMedicalRecordMutation,
} = medicalRecordApi;
