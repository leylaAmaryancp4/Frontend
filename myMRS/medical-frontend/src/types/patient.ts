import { User } from './auth';

export interface IPatient {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string; // Assuming date is a string for now
  gender: 'male' | 'female' | 'other';
  contact: string;
  doctor: User | string; // Can be populated with User object or just be an ID string
  address?: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}