import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPatient } from '@/types/patient';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/', credentials: 'include' }),
  tagTypes: ['Patient'],
  endpoints: (builder) => ({
    // Get all patients (optionally filtered by doctorId)
    getAllPatients: builder.query<IPatient[], string | void>({
      query: (doctorId) => doctorId ? `patients?doctor=${doctorId}` : 'patients',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Patient' as const, id: _id })),
              { type: 'Patient', id: 'LIST' },
            ]
          : [{ type: 'Patient', id: 'LIST' }],
    }),

    // Get single patient
    getPatientById: builder.query<IPatient, string>({
      query: (id) => `patients/${id}`,
      providesTags: (result, error, id) => [{ type: 'Patient', id }],
    }),

    // Create patient
    createPatient: builder.mutation<IPatient, Partial<IPatient>>({
      query: (body) => ({
        url: 'patients',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Patient', id: 'LIST' }],
    }),

    // Update patient
    updatePatient: builder.mutation<IPatient, { id: string; body: Partial<IPatient> }>({
      query: ({ id, body }) => ({
        url: `patients/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Patient', id },
        { type: 'Patient', id: 'LIST' },
      ],
    }),

    // Delete patient
    deletePatient: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
  { type: 'Patient', id },
  { type: 'Patient', id: 'LIST' },
]
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;