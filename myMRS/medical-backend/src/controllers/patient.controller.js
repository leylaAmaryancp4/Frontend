import { Patient } from '../models/patient.model.js';
import { User } from '../models/user.model.js';

export const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, dob, gender, contact, doctor } = req.body;

    // Validate that the doctorId corresponds to a user with the 'doctor' role
    const doctorUser = await User.findById(doctor);
    if (!doctorUser) {
      return res.status(404).json({ error: 'Assigned doctor user not found.' });
    }

    if (doctorUser.role !== 'doctor') {
      return res.status(400).json({ error: 'The assigned user is not a doctor.' });
    }

    const patient = await Patient.create({ firstName, lastName, dob, gender, contact, doctor });
    const populatedPatient = await Patient.findById(patient._id).populate('doctor');
    res.status(201).json({ message: 'Patient created', patient: populatedPatient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const doctorId = req.query.doctor; // get from query param
    const filter = doctorId ? { doctor: doctorId } : {};
    const patients = await Patient.find(filter);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).populate("doctor");
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dob, gender, contact, doctorId } = req.body;

    const updateData = { firstName, lastName, dob, gender, contact };

    if (doctorId) {
      const doctorUser = await User.findById(doctorId);
      if (!doctorUser) {
        return res.status(404).json({ error: 'Assigned doctor user not found.' });
      }
      if (doctorUser.role !== 'doctor') {
        return res.status(400).json({ error: 'The assigned user is not a doctor.' });
      }
      updateData.doctor = doctorId;
    }

    const patient = await Patient.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('doctor');
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    res.json({ message: 'Patient updated', patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};