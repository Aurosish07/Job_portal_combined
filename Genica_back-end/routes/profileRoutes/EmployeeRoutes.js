import express from 'express';
import { createEmployeeProfile, getEmployeeProfile, updateEmployeeProfile, deleteEmployeeProfile } from "../../controllers/profileControllors/EmpControllor.js";
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Employee profile routes
router.post('/profile', authenticateToken, checkRole(['user']), createEmployeeProfile);
router.get('/profile', authenticateToken, checkRole(['user']), getEmployeeProfile);
router.put('/profile', authenticateToken, checkRole(['user']), updateEmployeeProfile);
router.delete('/profile', authenticateToken, checkRole(['user']), deleteEmployeeProfile);

export default router;