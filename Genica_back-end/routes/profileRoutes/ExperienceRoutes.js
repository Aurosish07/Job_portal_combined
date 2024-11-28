import express from 'express';
import { addExperience, getEmployeeExperiences, updateExperience, deleteExperience } from "../../controllers/profileControllors/EmpExpCOntrollor.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Experience routes
router.post('/profile/experience', authenticateToken, checkRole(['user']), addExperience);
router.get('/profile/experiences', authenticateToken, checkRole(['user']), getEmployeeExperiences);
router.put('/experience/:id', authenticateToken, checkRole(['user']), updateExperience);
router.delete('/experience/:id', authenticateToken, checkRole(['user']), deleteExperience);

export default router;
