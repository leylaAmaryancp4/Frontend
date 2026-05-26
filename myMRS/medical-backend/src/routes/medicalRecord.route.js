import { Router } from 'express';
import { createRecord, getRecordsByPatient, getRecordById, updateRecord, deleteRecord } from '../controllers/medicalRecord.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Medical record routes (admin and doctor only)
router.post('/', authorize(['admin', 'doctor']), createRecord);
router.get('/patient/:patientId', authorize(['admin', 'doctor']), getRecordsByPatient);
router.get('/:id', authorize(['admin', 'doctor']), getRecordById);
router.put('/:id', authorize(['admin', 'doctor']), updateRecord);
router.delete('/:id', authorize(['admin', 'doctor']), deleteRecord);

export default router;