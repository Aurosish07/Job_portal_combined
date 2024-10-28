import express from "express";
import { createJob, getEmpJobs, delJob, updateJob } from "../controllers/jobAdminControllors.js";
import authenticateToken from "../middleware/authJWT.js";
import checkRole from "../middleware/roleauth.js";
import { EmpView, jobViewById, EmpAcc, EmpRej } from "../controllers/jobApplicationControllor.js";

const router = express.Router();

router.post("/job", authenticateToken, checkRole(['employer']), createJob);

router.get("/jobs", authenticateToken, checkRole(('employer')), getEmpJobs);

router.put("/job/:id", authenticateToken, checkRole(('employer')), updateJob);

router.delete("/job/:id", authenticateToken, checkRole(('employer')), delJob);

router.get("/jobs/applications", authenticateToken, checkRole(('employer')), EmpView);

router.get("/jobs/applications/:jobId", authenticateToken, checkRole(('employer')), jobViewById)

//Employee Accepted or rejected routes
router.put("/jobs/applications/accept/:jobId/:userId", authenticateToken, checkRole(('employer')), EmpAcc);
router.put("/jobs/applications/reject/:jobId/:userId", authenticateToken, checkRole(('employer')), EmpRej);



export default router;