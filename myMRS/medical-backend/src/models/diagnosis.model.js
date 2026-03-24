import { Schema, model } from 'mongoose';
import { MedicalRecord } from './medicalRecord.model.js';

// Diagnosis schema
const DiagnosisSchema = new Schema(
  {
    medicalRecord: { type: Schema.Types.ObjectId, ref: MedicalRecord, required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Create model
const Diagnosis = model('Diagnosis', DiagnosisSchema);

export { Diagnosis };