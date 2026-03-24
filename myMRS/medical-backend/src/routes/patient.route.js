import { Router } from 'express';
import { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patient.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Patient routes (admin and doctor only)
router.post('/', authorize(['admin', 'doctor']), createPatient);
router.get('/', authorize(['admin', 'doctor']), getAllPatients);
router.get('/:id', authorize(['admin', 'doctor']), getPatientById);
router.put('/:id', authorize(['admin', 'doctor']), updatePatient);
router.delete('/:id', authorize(['admin', 'doctor']), deletePatient);

export default router;