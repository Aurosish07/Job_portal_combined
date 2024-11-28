import Award from '../../models/profileModels/EmpAchivements.js';
import Employee from "../../models/profileModels/EmployeeModel.js";

// Create Award
export const createAward = async (req, res) => {
    try {
        const { awardName, awardingOrganization, dateReceived, description } = req.body;

        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const award = await Award.create({
            employeeId: employee.id,
            awardName,
            awardingOrganization,
            dateReceived,
            description
        });

        res.status(201).json({ award });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Awards for the Authenticated Employee
export const getEmployeeAwards = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const awards = await Award.findAll({
            where: { employeeId: employee.id },
            include: [{ model: Employee, attributes: ['id', 'phone'] }]
        });

        if (!awards.length) return res.status(404).json({ message: 'No awards found for this employee' });
        res.status(200).json({ awards });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Award by Award ID (with ownership check)
export const getAwardById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const award = await Award.findOne({
            where: { id, employeeId: employee.id },
            include: [{ model: Employee, attributes: ['id', 'phone'] }]
        });

        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json({ award });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Award (with ownership check)
export const updateAward = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const [updated] = await Award.update(updates, {
            where: { id, employeeId: employee.id }
        });
        if (!updated) return res.status(404).json({ message: 'Award not found or no changes made' });

        res.status(200).json({ message: 'Award updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Award (with ownership check)
export const deleteAward = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const deleted = await Award.destroy({
            where: { id, employeeId: employee.id }
        });
        if (!deleted) return res.status(404).json({ message: 'Award not found' });

        res.status(200).json({ message: 'Award deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
