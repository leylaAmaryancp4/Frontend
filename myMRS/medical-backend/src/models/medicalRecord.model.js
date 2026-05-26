import { Schema, model } from 'mongoose';
import { Patient } from './patient.model.js';

// MedicalRecord schema
const MedicalRecordSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: Patient, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    files: [{ type: String }],
  },
  { timestamps: true }
);

// Create model
const MedicalRecord = model('MedicalRecord', MedicalRecordSchema);

export { MedicalRecord };