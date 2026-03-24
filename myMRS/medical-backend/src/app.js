import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import patientRouter from './routes/patient.route.js';
import medicalRecordRouter from './routes/medicalRecord.route.js';
import diagnosisRouter from './routes/diagnosis.routes.js';
import recordRequestRouter from './routes/recordRequest.routes.js';
import chatRouter from './routes/chat.routes.js';
import setupRoutes from './routes/setup.routes.js';
import appointmentRouter from './routes/appointment.routes.js';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/setup', setupRoutes);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/patients', patientRouter);
app.use('/api/records', medicalRecordRouter);
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/requests', recordRequestRouter);
app.use('/api/chats', chatRouter);
app.use('/api/appointments', appointmentRouter);

export default app;