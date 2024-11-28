import Experience from "../../models/profileModels/EmpExperience.js";
import Employee from "../../models/profileModels/EmployeeModel.js";

// Create Experience Entry
export const addExperience = async (req, res) => {
    try {
        const { companyName, designation, responsibilities, startDate, endDate, isCurrent } = req.body;

        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        // Ensure endDate is null if isCurrent is true
        const experience = await Experience.create({
            employeeId: employee.id,
            companyName,
            designation,
            responsibilities,
            startDate,
            endDate: isCurrent ? null : endDate, // Set endDate to null if currently working
            isCurrent
        });

        res.status(201).json({ experience });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Experiences for the Authenticated Employee
export const getEmployeeExperiences = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const experiences = await Experience.findAll({
            where: { employeeId: employee.id }
        });

        if (!experiences.length) return res.status(404).json({ message: 'No experiences found for this employee' });
        res.status(200).json({ experiences });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Experience (with ownership check)
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        // Ensure the experience belongs to the authenticated user
        const experience = await Experience.findOne({
            where: { id, employeeId: employee.id }
        });
        if (!experience) return res.status(404).json({ message: 'Experience not found or does not belong to you' });

        await experience.update(updates);

        res.status(200).json({ message: 'Experience updated successfully', experience });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Experience (with ownership check)
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        // Ensure the experience belongs to the authenticated user
        const experience = await Experience.findOne({
            where: { id, employeeId: employee.id }
        });
        if (!experience) return res.status(404).json({ message: 'Experience not found or does not belong to you' });

        await experience.destroy();

        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
