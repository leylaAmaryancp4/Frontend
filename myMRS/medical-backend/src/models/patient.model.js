import { Schema, model } from 'mongoose';
import { User } from './user.model.js';

// Patient schema
const PatientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: User, required: true },
    address: { type: String },
    medicalHistory: { type: String },
  },
  { timestamps: true }
);

// Create model
const Patient = model('Patient', PatientSchema);

export { Patient };