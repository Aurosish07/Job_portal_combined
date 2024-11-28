import express from 'express';
import {
    createAward,
    getEmployeeAwards,
    getAwardById,
    updateAward,
    deleteAward
} from "../../controllers/profileControllors/EmpAchivementControllors.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';


const router = express.Router();

// Award Routes
router.post('/profile/award', authenticateToken, checkRole(['user']), createAward);               // Create new award
router.get('/profile/awards', authenticateToken, checkRole(['user']), getEmployeeAwards);         // Get all awards for an employee
router.get('/award/:id', authenticateToken, checkRole(['user']), getAwardById);                               // Get single award by award ID
router.put('/award/:id', authenticateToken, checkRole(['user']), updateAward);                                // Update award
router.delete('/award/:id', authenticateToken, checkRole(['user']), deleteAward);                             // Delete award

export default router;