import express from 'express';
import {
    createSkill,
    getAllSkills,
    addSkillToEmployee,
    getSkillsForEmployee,
    removeSkillFromEmployee,
    updateSkill,
    deleteSkill,
    fetchSkillsByKeyword
} from "../../controllers/profileControllors/EmpSkillsControllors.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Skill routes
router.post('/skills', authenticateToken, createSkill); // Create a skill
router.get('/skills', authenticateToken, getAllSkills); // Get all skills
router.get('/skillsName', authenticateToken, fetchSkillsByKeyword)
router.post('/profile/skills', authenticateToken, checkRole(['user']), addSkillToEmployee); // Assign skill to an employee
router.get('/profile/skills', authenticateToken, checkRole(['user']), getSkillsForEmployee); // Get skills for an employee
router.delete('/profile/skills', authenticateToken, checkRole(['user']), removeSkillFromEmployee); // Remove skill from an employee
router.put('/skills/:skillId', authenticateToken, checkRole(['user']), updateSkill); // Update a skill
router.delete('/skills/:skillId', authenticateToken, checkRole(['user']), deleteSkill); // Delete a skill

export default router;
