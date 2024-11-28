import Job from "../models/jobModel.js";
import { Op } from "sequelize";

//Create jobs
export const createJob = async (req, resp) => {

    const { title, description, requirements, location, salary, company } = req.body;
    const employerId = req.user.userId;

    try {

        const newJob = await Job.create({
            title,
            description,
            requirements,
            location,
            salary,
            company,
            employerId,
        });

        // resp.status(201).json(newJob);
        resp.redirect("/api/role/employer/jobs");
    } catch (error) {
        resp.status(500).json({ error: 'Failed to create job' });
    }

}


//get all jobs posted by an employer
export const getEmpJobs = async (req, resp) => {

    try {

        const employerId = req.user.userId;

        const EmpJobs = await Job.findAll({ where: { employerId } });
        resp.status(200).json(EmpJobs);

    } catch (error) {

        resp.status(500).json({ error: 'Failed to fetch jobs' });

    }

}



//delete a specific job from a specific employer
export const delJob = async (req, resp) => {
    try {

        const employerId = req.user.userId;

        const { id } = req.params;

        const empJob = await Job.findOne({ where: { employerId, id } });

        if (!empJob) {
            return resp.status(404).json({ error: 'Job not found' });
        }

        await empJob.destroy();
        // resp.status(200).json({ message: 'Job deleted successfully' });

        resp.status(200).redirect("/api/role/employer/jobs");

    } catch (error) {

        resp.status(500).json({ error: 'Failed to delete jobs' });

    }
}



//update Employer specific Jobs
export const updateJob = async (req, resp) => {
    try {

        const { id } = req.params;
        const { title, description, requirements, location, salary, company } = req.body;

        const employerId = req.user.userId;

        const empJob = await Job.findOne({ where: { employerId, id } });

        if (!empJob) {
            return resp.status(404).json({ error: 'Job not found' });
        }

        empJob.title = title;
        empJob.description = description;
        empJob.requirements = requirements;
        empJob.location = location;
        empJob.salary = salary;
        empJob.company = company;

        await empJob.save();

        resp.status(200).redirect("/api/role/employer/jobs");

    } catch (error) {

        resp.status(500).json({ error: "Failed to update job" })

    }
}




// Get All jobs (not in use for  now , can be used with pagegnation if required)
// export const getJobs = async (req, resp) => {
//     try {
//         const jobs = await Job.findAll();
//         resp.status(200).json(jobs);
//     } catch (error) {
//         resp.status(500).json({ error: 'Failed to fetch jobs' });
//     }
// };



//search or filter jobs by title and location
export const searchJob = async (req, resp) => {

    const { title, location, page = 1, limit = 2 } = req.query;

    const offset = (page - 1) * limit;

    try {
        // Find and count all jobs with search criteria and pagination
        const { count, rows: jobs } = await Job.findAndCountAll({
            where: {
                [Op.and]: [
                    title ? { title: { [Op.iLike]: `%${title}%` } } : {},
                    location ? { location: { [Op.iLike]: `%${location}%` } } : {},
                ],
            },
            offset,
            limit: parseInt(limit),
        });

        // Send paginated results with metadata
        resp.status(200).json({
            jobs,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({ error: 'Failed to search jobs' });
    }

}