import { RecordRequest } from '../models/recordRequest.model.js';
import { Hospital } from '../models/hospital.model.js';
import { Patient } from '../models/patient.model.js';
import { User } from '../models/user.model.js';

export const createRequest = async (req, res) => {
  try {
    const { hospitalId, doctorId, patientId, message } = req.body;
    const request = await RecordRequest.create({ hospital: hospitalId, doctor: doctorId, patient: patientId, message });
    res.status(201).json({ message: 'Request created', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RecordRequest.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (!request) return res.status(404).json({ error: 'Request not found' });

    res.json({ message: 'Request approved', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RecordRequest.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    if (!request) return res.status(404).json({ error: 'Request not found' });

    res.json({ message: 'Request rejected', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await RecordRequest.find()
      .populate('hospital')
      .populate('patient')
      .populate('doctor');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};