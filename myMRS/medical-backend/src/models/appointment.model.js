import { Schema, model } from 'mongoose';
import { User } from './user.model.js';
import { Patient } from './patient.model.js';

// Appointment schema
const AppointmentSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: Patient, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: User, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

// Create model
const Appointment = model('Appointment', AppointmentSchema);

export { Appointment };
