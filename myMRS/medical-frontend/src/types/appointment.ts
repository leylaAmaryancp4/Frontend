import { IPatient } from './patient';
import { User } from './auth';

export interface IAppointment {
  _id: string;
  patient: IPatient | string;
  doctor: User | string;
  date: string; // ISO string
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

