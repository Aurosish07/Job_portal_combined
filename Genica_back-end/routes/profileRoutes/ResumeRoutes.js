import express from 'express';
import upload from "../../middleware/fileUpload.js"
import {
    uploadResume,
    getResumeByEmployee,
    updateResume,
    deleteResume
} from "../../controllers/profileControllors/EmpResumeControllors.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Routes for resume
router.post('/resume', authenticateToken, checkRole(['user']), upload.single('resume'), uploadResume);
router.get('/resume', authenticateToken, checkRole(['user']), getResumeByEmployee);
router.put('/resume', authenticateToken, checkRole(['user']), upload.single('resume'), updateResume);
router.delete('/resume', authenticateToken, checkRole(['user']), deleteResume);

export default router;
