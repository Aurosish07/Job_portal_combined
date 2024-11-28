import Employee from "../../models/profileModels/EmployeeModel.js"
import User from "../../models/userModel.js"
import Auth from "../../models/userLoginModel.js";

// Create Employee Profile
export const createEmployeeProfile = async (req, res) => {
    try {
        const { phone, residency, profileSummary, preferredWorkLocation, preferredJobType, preferredWorkTime, workEnvironment } = req.body;
        const userId = req.user.userId;

        // Ensure the user exists before creating the profile
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the employee profile already exists
        const existingProfile = await Employee.findOne({ where: { userId } });
        if (existingProfile) return res.status(400).json({ message: 'Employee profile already exists' });

        const employeeProfile = await Employee.create({
            userId,
            phone,
            residency,
            profileSummary,
            preferredWorkLocation,
            preferredJobType,
            preferredWorkTime,
            workEnvironment
        });
        res.status(201).json({ employeeProfile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Employee Profile by ID
export const getEmployeeProfile = async (req, res) => {
    try {
        const employeeProfile = await Employee.findOne({
            where: { userId: req.user.userId },
            include: [{
                model: User,
                attributes: ['name', 'email'] // Include name and email from User
            }]
        });
        if (!employeeProfile) return res.status(404).json({ message: 'Profile not found' });

        res.status(200).json({ employeeProfile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Employee Profile
export const updateEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Authenticated user's ID
        const updates = req.body; // Data from the request body

        // Dynamically pick only valid fields from the Employee model
        const employeeAttributes = Object.keys(Employee.getAttributes()); // Fetch all attributes from Employee model
        const filteredUpdates = Object.keys(updates)
            .filter(key => employeeAttributes.includes(key)) // Keep only valid attributes
            .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {});

        // Update Employee model with filtered data
        const [updatedEmployee] = await Employee.update(filteredUpdates, {
            where: { userId }
        });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Profile not found or no changes made' });
        }

        // If name or email is included in the request body, update the User and Auth models
        if (updates.name || updates.email) {
            const userUpdates = {};
            if (updates.name) userUpdates.name = updates.name;
            if (updates.email) userUpdates.email = updates.email;

            await User.update(userUpdates, { where: { id: userId } });
            await Auth.update(userUpdates, { where: { userId } });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Employee Profile
export const deleteEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const deleted = await Employee.destroy({ where: { userId } });
        if (!deleted) return res.status(404).json({ message: 'Profile not found' });

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
