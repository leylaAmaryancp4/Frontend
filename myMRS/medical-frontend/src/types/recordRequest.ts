import { IHospital } from './hospital';
import { IUser } from './user';
import { IPatient } from './patient';

export interface IRecordRequest {
  _id: string;
  hospital: IHospital;
  doctor: IUser;
  patient: IPatient;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
