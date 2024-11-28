import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profilerouter0 from "./routes/profileRoutes/AchivementRoutes.js"
import profilerouter1 from "./routes/profileRoutes/certificateRoutes.js"
import profilerouter2 from "./routes/profileRoutes/EducationRoutes.js"
import profilerouter3 from "./routes/profileRoutes/EmployeeRoutes.js"
import profilerouter4 from "./routes/profileRoutes/ExperienceRoutes.js"
import profilerouter5 from "./routes/profileRoutes/projectsRoutes.js"
import profilerouter6 from "./routes/profileRoutes/ResumeRoutes.js"
import profilerouter7 from "./routes/profileRoutes/skillRoutes.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 80;
const app = express();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Connection
connectDB();

// Middleware
app.use(cors({
    origin: 'https://job-portal-combined.onrender.com',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);        // Authentication routes
app.use("/api/role", roleRoutes);        // Role-based routes
app.use("/api/role/employer", jobRoutes);         // Job-related routes

app.use("/api/employee", profilerouter0);
app.use("/api/employee", profilerouter1);
app.use("/api/employee", profilerouter2);
app.use("/api/employee", profilerouter3);
app.use("/api/employee", profilerouter4);
app.use("/api/employee", profilerouter5);
app.use("/api/employee", profilerouter6);
app.use("/api/employee", profilerouter7);

// Serve Static Files in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Job_React/build')));

    // Fallback route for React Router
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Job_React/build', 'index.html'));
    });
}

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
