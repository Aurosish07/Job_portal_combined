import express from 'express';
import {
    addEducation,
    getEmployeeEducation,
    getEducationById,
    updateEducation,
    deleteEducation,
} from "../../controllers/profileControllors/EmpEduControllors.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Education routes
router.post('/profile/education', authenticateToken, checkRole(['user']), addEducation);
router.get('/profile/education', authenticateToken, checkRole(['user']), getEmployeeEducation);
router.get('/education/:id', authenticateToken, checkRole(['user']), getEducationById);
router.put('/education/:id', authenticateToken, checkRole(['user']), updateEducation);
router.delete('/education/:id', authenticateToken, checkRole(['user']), deleteEducation);

export default router;
