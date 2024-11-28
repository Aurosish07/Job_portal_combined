import express from 'express';
import {
    createProject,
    getEmployeeProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../../controllers/profileControllors/EmpProjectControllors.js"
import authenticateToken from '../../middleware/authJWT.js';
import checkRole from '../../middleware/roleauth.js';

const router = express.Router();

// Routes for project management
router.post('/projects', authenticateToken, checkRole(['user']), createProject); // Create a new project
router.get('/projects', authenticateToken, checkRole(['user']), getEmployeeProjects); // Get all projects for an employee
router.get('/project/:id', authenticateToken, checkRole(['user']), getProjectById); // Get a single project by ID
router.put('/project/:id', authenticateToken, checkRole(['user']), updateProject); // Update a project by ID
router.delete('/project/:id', authenticateToken, checkRole(['user']), deleteProject); // Delete a project by ID

export default router;
