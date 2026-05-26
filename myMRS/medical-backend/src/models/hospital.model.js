import { Schema, model } from 'mongoose';

// Hospital schema
const HospitalSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// Create model
const Hospital = model('Hospital', HospitalSchema);

export { Hospital };