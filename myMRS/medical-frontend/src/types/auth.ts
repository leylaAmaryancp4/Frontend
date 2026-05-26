export interface User {
    _id: string;
    name:string;
    lastName?: string;
    speciality?: string;
    email:string;
    role: "doctor" | "hospital" | "admin" | "user";
    profilePicture?: string;
    bio?: string;
    department?: string;
    office?: string;
    availability?: {
        day: string;
        time: string;
    }[];
    education?: string[];
    certifications?: string[];
}

export interface AuthResponse{
    message: string;
    user: User;
}

export interface LoginPayload{
    email:string;
    password:string;
}

export interface RegisterPayload{
    name:string;
    lastName:string;
    email:string;
    password:string;
    roleId:"doctor" | "hospital" |"admin" | "user";
}

// Patient
export interface Patient {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    contact: string;
    doctor: string; //
    address?: string;
    medicalHistory?: string;
    medicalRecords: MedicalRecord[];
}

// Medical Records
export interface MedicalRecord {
    id: number;
    diagnosis: string;
    treatment: string;
    files: string[]; // file URLs
    createdAt: string;
}

// Record Requests
export interface RecordRequest {
    id: number;
    patientId: number;
    requestedByHospitalId: number;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}

// Chat
export interface Message {
    id: number;
    senderId: number;
    content: string;
    timestamp: string;
}

export interface Chat {
    id: number;
    requestId: number; // linked to RecordRequest
    messages: Message[];
}

// Appointment
export interface Appointment {
    _id: string;
    patient: string;
    doctor: string;
    date: string;
    time: string;
    reason: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}