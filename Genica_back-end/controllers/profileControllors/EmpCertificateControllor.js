import Certification from "../../models/profileModels/EmpCertificate.js";
import Employee from "../../models/profileModels/EmployeeModel.js";

// Create a new Certification
export const addCertification = async (req, res) => {
    try {
        const { name, issuingOrganization, completionDate, certificationURL } = req.body;

        // Find the employee based on the authenticated user's userId
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        // Create the certification
        const certification = await Certification.create({
            employeeId: employee.id,
            name,
            issuingOrganization,
            completionDate,
            certificationURL,
        });

        res.status(201).json({ certification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Certifications for the authenticated Employee
export const getEmployeeCertifications = async (req, res) => {
    try {
        // Find the employee based on the authenticated user's userId
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        // Find all certifications related to the employee
        const certifications = await Certification.findAll({
            where: { employeeId: employee.id },
        });

        res.status(200).json({ certifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Certification by ID (with ownership check)
export const getCertificationById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee based on the authenticated user's userId
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        // Find the certification with an ownership check
        const certification = await Certification.findOne({
            where: { id, employeeId: employee.id },
        });

        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        res.status(200).json({ certification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Certification (with ownership check)
export const updateCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the employee based on the authenticated user's userId
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        // Update the certification with an ownership check
        const [updated] = await Certification.update(updates, {
            where: { id, employeeId: employee.id },
        });

        if (!updated) {
            return res.status(404).json({ message: 'Certification not found or no changes made' });
        }

        const updatedCertification = await Certification.findOne({
            where: { id, employeeId: employee.id },
        });

        res.status(200).json({ updatedCertification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Certification (with ownership check)
export const deleteCertification = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee based on the authenticated user's userId
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        // Delete the certification with an ownership check
        const deleted = await Certification.destroy({
            where: { id, employeeId: employee.id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        res.status(200).json({ message: 'Certification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
