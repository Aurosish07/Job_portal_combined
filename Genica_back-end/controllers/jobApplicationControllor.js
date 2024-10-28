import JobApplication from "../models/jobApplication.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

//Applying Job
export const JobApp = async (req, resp) => {

    const jobId = req.params.jobId;
    const userId = req.user.userId;

    try {

        const existingApplication = await JobApplication.findOne({ where: { jobId, userId } });

        if (existingApplication) {
            return resp.status(400).json({ message: "Already applied " });
        }


        const application = await JobApplication.create({ jobId, userId });
        resp.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        console.log(error);
        resp.status(500).json({ error: 'Failed to apply for the job' });
    }

}


//Employe viewing job applications for their job
export const EmpView = async (req, resp) => {

    const employerId = req.user.userId;

    try {

        const jobs = await Job.findAll({ where: { employerId } });

        const jobIds = jobs.map(job => job.id);

        const applications = await JobApplication.findAll({
            where: { jobId: { [Op.in]: jobIds } },
            include: [
                { model: User, attributes: ['id', 'email'] }, // Including user details
                { model: Job, attributes: ['id', 'title'] } // Including job details
            ]
        });

        resp.status(200).json(applications);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ error: 'Failed to fetch applications' });
    }


}


//job application by perticular job id
export const jobViewById = async (req, resp) => {
    const { jobId } = req.params;

    try {
        const applications = await JobApplication.findAll({
            where: { jobId },
            include: [
                { model: User, attributes: ['id', 'email'] },
                { model: Job, attributes: ['id', 'title'] }
            ]
        });

        resp.status(200).json(applications);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ error: 'Failed to fetch applications' });
    }
};




// Accept an employee application
export const EmpAcc = async (req, resp) => {

    const { jobId, userId } = req.params;

    try {
        const application = await JobApplication.findOne({ where: { jobId, userId } })

        if (!application) {
            return resp.status(404).json({ message: 'Application not found' });
        }

        application.status = 'accepted';
        await application.save();

        resp.status(200).json({ message: 'Application accepted', application });
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'Failed to accept application' });
    }

}


// Reject employee an application
export const EmpRej = async (req, resp) => {

    const { jobId, userId } = req.params;

    try {
        const application = await JobApplication.findOne({ where: { jobId, userId } })

        if (!application) {
            return resp.status(404).json({ message: 'Application not found' });
        }

        application.status = 'rejected';
        await application.save();

        resp.status(200).json({ message: 'Application rejected', application });
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'Failed to reject application' });
    }

}