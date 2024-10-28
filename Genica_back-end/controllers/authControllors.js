import User from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Auth from "../models/userLoginModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

const register = async (req, resp) => {

    const { email, password, role } = req.body;

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

    console.log(req.body);

    try {

        const exist = await Auth.findOne({ where: { email } });

        if (exist) {
            return resp.status(409).send("User already exists");
        }

        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({ email, password: hash, role });
        await Auth.create({ email, password: hash, userId: newUser.id, role });

        console.log(newUser);
        const token = jwt.sign({ email: newUser.email, userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // resp.status(201).json({ message: 'User registered successfully', token });
        // console.log("sucessfully registred", token);

        resp.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        });

        if (newUser.role === 'employer') {
            resp.redirect("/api/role/employer");
        } else {
            resp.redirect('/api/auth/main');

        }

        // if (newUser.role === 'employer') {
        //     resp.status(200).json({ redirectUrl: "/api/role/employer" });
        // } else {
        //     resp.status(200).json({ redirectUrl: "/api/auth/main" });
        // }

    } catch (error) {
        console.log(error);
        resp.status(500).send("Internal server error");
    }
}


const login = async (req, resp) => {

    const { email, password } = req.body;

    try {
        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return resp.status(404).send("User doesn't exist")
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            resp.status(401).send("Wrong password Entered");
        } else {

            const token = jwt.sign({ email, userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            resp.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            });

            // resp.status(200).json({ message: "Login successful", token });

            if (user.role === 'employer') {
                resp.redirect("/api/role/employer");
            } else {
                resp.redirect('/api/auth/main');
            }
        }

    } catch (err) {

        console.log(err);
        resp.status(500).send('Internal Server Error');

    }
}

const logout = async (req, resp) => {

    resp.status(200).json({ message: "Sucessfully logged out" })

}

//Protected Route
const main = async (req, resp) => {

    console.log("Main route hits");

    resp.status(200).json({
        success: true,
        user: req.user,
        message: 'sucessfully authenticated , please allow location access to fetch jobs in your location.',
        requireLocation: true
    });

}


const cheakStatus = async (req, resp) => {

    const token = req.cookies.token;

    if (token) {

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return resp.status(403).json({ message: 'Forbidden:Error while verifying token' });
            resp.json({
                isLoggedin: true,
                role: user.role,
            })
        });


    } else {

        resp.status(200).json({
            isLoggedin: false,
        })
    }

}



export { register, login, main, cheakStatus, logout }