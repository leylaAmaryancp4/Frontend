import { configureStore } from '@reduxjs/toolkit';
import authReducer from './api/slices/authSlice';
import { authApi } from './api/authApi';
import { medicalRecordApi } from './api/medicalRecordApi';
import { diagnosisApi } from './api/diagnosisApi';
import { userApi } from './api/userApi';
import { patientApi } from './api/patientApi';
import { recordRequestApi } from './api/recordRequestApi';
import { appointmentApi } from './api/appointmentApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [medicalRecordApi.reducerPath]: medicalRecordApi.reducer,
    [diagnosisApi.reducerPath]: diagnosisApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [recordRequestApi.reducerPath]: recordRequestApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      medicalRecordApi.middleware,
      diagnosisApi.middleware,
      userApi.middleware,
      patientApi.middleware,
      recordRequestApi.middleware,
      appointmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
