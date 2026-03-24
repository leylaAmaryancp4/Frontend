import { Schema, model } from 'mongoose';
import { Hospital } from './hospital.model.js';
import { User } from './user.model.js';
import { Patient } from './patient.model.js';

// RecordRequest schema
const RecordRequestSchema = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: Hospital, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: User, required: true },
    patient: { type: Schema.Types.ObjectId, ref: Patient, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

// Create model
const RecordRequest = model('RecordRequest', RecordRequestSchema);

export { RecordRequest };