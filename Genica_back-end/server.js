import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import router from "./routes/authRoutes.js"
import router2 from "./routes/roleRoutes.js";
import router3 from "./routes/jobRoutes.js";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

dotenv.config();

const port = process.env.PORT || 80;
const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
    credentials: true
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Job_React/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Job_React', 'build', 'index.html'));
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

//Root Endpoint
// app.get("/", (req, resp) => {
//     resp.sendStatus(200);
// })

//Api main endpoint
app.use("/api/auth", router);

//Roleauth Endpoint
app.use("/api/role", router2);

//job routes
app.use("/api/role/employer", router3);


app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})