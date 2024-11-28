import Project from "../../models/profileModels/EmpProjects.js";
import Employee from "../../models/profileModels/EmployeeModel.js";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, technologiesUsed, duration, description, projectURL } = req.body;

        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const project = await Project.create({
            employeeId: employee.id,
            name,
            technologiesUsed,
            duration,
            description,
            projectURL,
        });

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all projects for the authenticated employee
export const getEmployeeProjects = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const projects = await Project.findAll({
            where: { employeeId: employee.id },
            include: [{ model: Employee, attributes: ['id', 'phone'] }],
        });

        if (!projects.length) return res.status(404).json({ message: 'No projects found for this employee' });

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single project by ID (with ownership check)
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const project = await Project.findOne({
            where: { id, employeeId: employee.id },
            include: [{ model: Employee, attributes: ['id', 'phone'] }],
        });

        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a project by ID (with ownership check)
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const [updated] = await Project.update(updates, {
            where: { id, employeeId: employee.id }
        });

        if (!updated) return res.status(404).json({ message: 'Project not found or no changes made' });

        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a project by ID (with ownership check)
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const deleted = await Project.destroy({
            where: { id, employeeId: employee.id }
        });

        if (!deleted) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
