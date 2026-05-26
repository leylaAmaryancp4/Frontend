import { Router } from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authenticate);

// Doctor/admin can manage appointments
router.get('/', authorize(['admin', 'doctor']), getAllAppointments);
router.get('/:id', authorize(['admin', 'doctor']), getAppointmentById);
router.post('/', authorize(['admin', 'doctor']), createAppointment);
router.put('/:id', authorize(['admin', 'doctor']), updateAppointment);
router.delete('/:id', authorize(['admin', 'doctor']), deleteAppointment);

export default router;

