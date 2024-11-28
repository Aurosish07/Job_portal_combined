import Resume from "../../models/profileModels/EmpResume.js";
import Employee from "../../models/profileModels/EmployeeModel.js";
import fs from 'fs';
import path from 'path';

// Create/Upload Resume
export const uploadResume = async (req, res) => {
    try {
        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const filePath = req.file.path;

        // Check if the employee already has a resume
        const existingResume = await Resume.findOne({ where: { employeeId: employee.id } });
        if (existingResume) {
            // Delete the old file
            fs.unlinkSync(existingResume.filePath);
            await existingResume.destroy();
        }

        const resume = await Resume.create({ employeeId: employee.id, filePath });
        res.status(201).json({ message: 'Resume uploaded successfully', resume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Resume for Authenticated Employee
export const getResumeByEmployee = async (req, res) => {
    try {
        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const resume = await Resume.findOne({ where: { employeeId: employee.id } });
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        res.status(200).json({ resume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Resume (Re-upload)
export const updateResume = async (req, res) => {
    try {
        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const filePath = req.file.path;

        // Fetch the existing resume
        const existingResume = await Resume.findOne({ where: { employeeId: employee.id } });
        if (!existingResume) return res.status(404).json({ message: 'Resume not found' });

        // Delete the old file
        fs.unlinkSync(existingResume.filePath);

        // Update the resume
        existingResume.filePath = filePath;
        await existingResume.save();

        res.status(200).json({ message: 'Resume updated successfully', resume: existingResume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Resume
export const deleteResume = async (req, res) => {
    try {
        // Find the employee based on userId from the authenticated token
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });
        if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

        const resume = await Resume.findOne({ where: { employeeId: employee.id } });
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        // Delete the file from the file system
        fs.unlinkSync(resume.filePath);

        // Delete the database record
        await resume.destroy();

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
