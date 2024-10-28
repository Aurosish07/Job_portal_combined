import express from "express";
import cheakroleAuth from "../middleware/roleauth.js";
import employer from "../controllers/roleControllor.js";
import authtoken from "../middleware/authJWT.js";

const router = express.Router();

router.get("/employer", authtoken, cheakroleAuth(['employer']), employer);

export default router;