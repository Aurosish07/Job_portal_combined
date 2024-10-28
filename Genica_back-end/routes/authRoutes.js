import express from "express";
import { register, login, main, logout } from "../controllers/authControllors.js";
import authToken from "../middleware/authJWT.js";
import { searchJob } from "../controllers/jobAdminControllors.js";
import { JobApp } from "../controllers/jobApplicationControllor.js";
import { createResume, getResume, updateResume, deleteResume } from "../controllers/resumeControllors.js";
import { cheakStatus } from "../controllers/authControllors.js"

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authToken, logout)

router.get("/main", authToken, main);

router.get("/cheak-status", cheakStatus);


//user job routes   

router.get("/search", searchJob); //Search jobs by location , title , salary in query params

router.post("/jobs/:jobId/apply", authToken, JobApp); //Apply a job


//user Resume routes(incompleted)
router.post("/resume", authToken, createResume);
router.get('/resume/:userId', authToken, getResume);
router.put('/resume/:userId', authToken, updateResume);
router.delete('/resume/:userId', authToken, deleteResume);

export default router;