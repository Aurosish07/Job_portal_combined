import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import Resume from "../models/resumeModel.js";

// Create a new resume
export const createResume = async (req, resp) => {

    const { resumeData } = req.body;
    const userId = req.user.userId;

    const resume = await Resume.findOne({ where: { userId } });

    if (resume) {
        return resp.status(400).json({ message: "Already created ! " });
    }

    try {
        const newResume = await Resume.create({ userId, resumeData });
        resp.status(201).json({ message: 'Resume created successfully', data: newResume });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error , failed to create' });
    }
};


// Get a resume by userId
export const getResume = async (req, resp) => {
    const { userId } = req.params;

    try {
        const resume = await Resume.findOne({ where: { userId } });
        if (!resume) {
            return resp.status(404).json({ message: 'Resume not found' });
        }
        resp.status(200).json({ data: resume });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
};




// Update a resume
export const updateResume = async (req, resp) => {
    const { userId } = req.params;
    const { resumeData } = req.body;

    try {
        const resume = await Resume.findOne({ where: { userId } });
        if (!resume) {
            return resp.status(404).json({ message: 'Resume not found' });
        }
        resume.resumeData = resumeData;
        await resume.save();
        resp.status(200).json({ message: 'Resume updated successfully', data: resume });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
};



// Delete a resume
export const deleteResume = async (req, resp) => {
    const { userId } = req.params;

    try {
        const resume = await Resume.findOne({ where: { userId } });
        if (!resume) {
            return resp.status(404).json({ message: 'Resume not found' });
        }
        await resume.destroy();
        resp.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
};