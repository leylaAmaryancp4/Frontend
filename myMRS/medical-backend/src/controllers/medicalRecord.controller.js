import { MedicalRecord } from '../models/medicalRecord.model.js';
import { Patient } from '../models/patient.model.js';

export const createRecord = async (req, res) => {
  try {
    const { patientId, title, description, files } = req.body;
    const record = await MedicalRecord.create({ patient: patientId, title, description, files });
    res.status(201).json({ message: 'Medical record created', record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getRecordsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await MedicalRecord.find({ patient: patientId }).populate("patient");
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalRecord.findById(id).populate("patient");
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, files } = req.body;

    const record = await MedicalRecord.findByIdAndUpdate(id, { title, description, files }, { new: true });
    if (!record) return res.status(404).json({ error: 'Record not found' });

    res.json({ message: 'Record updated', record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalRecord.findByIdAndDelete(id);
    if (!record) return res.status(404).json({ error: 'Record not found' });

    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};