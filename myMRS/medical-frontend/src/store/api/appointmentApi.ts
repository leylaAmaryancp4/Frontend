import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAppointment } from '@/types/appointment';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/', credentials: 'include' }),
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    getAppointments: builder.query<IAppointment[], { doctorId?: string; patientId?: string } | void>({
      query: (args) => {
        if (!args) return 'appointments';
        const params = new URLSearchParams();
        if (args.doctorId) params.set('doctor', args.doctorId);
        if (args.patientId) params.set('patient', args.patientId);
        const q = params.toString();
        return q ? `appointments?${q}` : 'appointments';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Appointment' as const, id: _id })),
              { type: 'Appointment', id: 'LIST' },
            ]
          : [{ type: 'Appointment', id: 'LIST' }],
    }),

    createAppointment: builder.mutation<IAppointment, { patientId: string; doctorId: string; date: string; time: string; reason: string; status?: IAppointment['status'] }>({
      query: (body) => ({
        url: 'appointments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Appointment', id: 'LIST' }],
    }),
  }),
});

export const { useGetAppointmentsQuery, useCreateAppointmentMutation } = appointmentApi;

