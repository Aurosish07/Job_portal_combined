import express from 'express';
import { addCertification, getEmployeeCertifications, getCertificationById, updateCertification, deleteCertification } from "../../controllers/profileControllors/EmpCertificateControllor.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Certification routes
router.post('/profile/certifications', authenticateToken, checkRole(['user']), addCertification);
router.get('/profile/certifications', authenticateToken, checkRole(['user']), getEmployeeCertifications);
router.get('/certification/:id', authenticateToken, checkRole(['user']), getCertificationById);
router.put('/certification/:id', authenticateToken, checkRole(['user']), updateCertification);
router.delete('/certification/:id', authenticateToken, checkRole(['user']), deleteCertification);

export default router;
