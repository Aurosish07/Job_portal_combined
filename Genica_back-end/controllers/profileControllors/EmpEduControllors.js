import Education from "../../models/profileModels/EmpEducation.js";
import Employee from "../../models/profileModels/EmployeeModel.js";

// Create an Education Entry
export const addEducation = async (req, res) => {
    try {
        const { degree, institution, specialization, gpaOrScore, graduationDate } = req.body;

        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) {
            return res.status(404).json({ message: "Employee profile not found" });
        }

        // Create the education record
        const education = await Education.create({
            employeeId: employee.id,
            degree,
            institution,
            specialization,
            gpaOrScore,
            graduationDate,
        });

        res.status(201).json({ education });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Education Entries for the Authenticated Employee
export const getEmployeeEducation = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) {
            return res.status(404).json({ message: "Employee profile not found" });
        }

        const educationEntries = await Education.findAll({
            where: { employeeId: employee.id },
            include: { model: Employee, attributes: ["id", "phone"] }, // Optional, include additional employee info
        });

        if (educationEntries.length === 0) {
            return res.status(404).json({ message: "No education records found for this employee" });
        }

        res.status(200).json({ educationEntries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Single Education Entry by ID (with ownership check)
export const getEducationById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) {
            return res.status(404).json({ message: "Employee profile not found" });
        }

        const education = await Education.findOne({
            where: { id, employeeId: employee.id },
            include: { model: Employee, attributes: ["id", "phone"] }, // Optional, include additional employee info
        });

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        res.status(200).json({ education });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an Education Entry (with ownership check)
export const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) {
            return res.status(404).json({ message: "Employee profile not found" });
        }

        const [updated] = await Education.update(updates, {
            where: { id, employeeId: employee.id },
        });

        if (!updated) {
            return res.status(404).json({ message: "Education record not found or no changes made" });
        }

        res.status(200).json({ message: "Education updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an Education Entry (with ownership check)
export const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) {
            return res.status(404).json({ message: "Employee profile not found" });
        }

        const deleted = await Education.destroy({
            where: { id, employeeId: employee.id },
        });

        if (!deleted) {
            return res.status(404).json({ message: "Education record not found" });
        }

        res.status(200).json({ message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
