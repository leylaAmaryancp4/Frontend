import { Schema, model } from 'mongoose';

// Role schema
const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

// Create model
const Role = model('Role', RoleSchema);

export { Role };