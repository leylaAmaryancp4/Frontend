import { Schema, model } from 'mongoose';

// User schema


const UserSchema = new Schema(
{
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  speciality: { type: String }, // doctors only
  profilePicture: { type: String },
  bio: { type: String },
  department: { type: String },
  office: { type: String },
  availability: [{
    day: { type: String },
    time: { type: String },
  }],
  education: [{ type: String }],
  certifications: [{ type: String }],

  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'doctor', 'hospital']
  }
},
{ timestamps: true }
);

const User = model("User", UserSchema);

export { User };