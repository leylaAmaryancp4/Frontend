import { IRole } from './role';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  speciality?: string; // Only for doctors
  role: IRole;
  createdAt: string;
  updatedAt: string;
}
