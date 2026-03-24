import { Appointment } from '../models/appointment.model.js';
import { Patient } from '../models/patient.model.js';
import { User } from '../models/user.model.js';

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason, status } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    if (doctor.role !== 'doctor') return res.status(400).json({ error: 'Assigned user is not a doctor' });

    const appt = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      reason,
      status,
    });

    const populated = await Appointment.findById(appt._id).populate('patient').populate('doctor');
    res.status(201).json({ message: 'Appointment created', appointment: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const doctorId = req.query.doctor;
    const patientId = req.query.patient;

    const filter = {};
    if (doctorId) filter.doctor = doctorId;
    if (patientId) filter.patient = patientId;

    const appts = await Appointment.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .populate('patient')
      .populate('doctor');

    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id).populate('patient').populate('doctor');
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, reason, status } = req.body;

    const updateData = {};
    if (date !== undefined) updateData.date = date;
    if (time !== undefined) updateData.time = time;
    if (reason !== undefined) updateData.reason = reason;
    if (status !== undefined) updateData.status = status;

    const appt = await Appointment.findByIdAndUpdate(id, updateData, { new: true })
      .populate('patient')
      .populate('doctor');
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    res.json({ message: 'Appointment updated', appointment: appt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findByIdAndDelete(id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

