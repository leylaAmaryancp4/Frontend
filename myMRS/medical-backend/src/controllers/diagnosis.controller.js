import { Diagnosis } from '../models/diagnosis.model.js';

export const createDiagnosis = async (req, res) => {
  try {
    const { medicalRecordId, diagnosis, notes } = req.body;
    const diag = await Diagnosis.create({ medicalRecord: medicalRecordId, diagnosis, notes });
    res.status(201).json({ message: 'Diagnosis added', diag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getDiagnosesByRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const diagnoses = await Diagnosis.find({ medicalRecord: medicalRecordId });
    res.json(diagnoses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};