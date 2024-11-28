import { Skill, EmployeeSkill } from "../../models/profileModels/skillsModel.js";
import Employee from "../../models/profileModels/EmployeeModel.js";
import { Op } from "sequelize";

/**
 * Create a new skill
 */
export const createSkill = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the skill already exists
        const existingSkill = await Skill.findOne({ where: { name } });
        if (existingSkill) {
            return res.status(400).json({ message: 'Skill already exists.' });
        }

        const skill = await Skill.create({ name });
        res.status(201).json({ skill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get all skills
 */
export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json({ skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//get skills by fetching typehead
export const fetchSkillsByKeyword = async (req, res) => {
    const { keyword } = req.query;

    console.log(req.query.keyword)

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required.' });
    }

    try {
        const skills = await Skill.findAll({
            where: {
                name: {
                    [Op.iLike]: `${keyword}%`, // Matches names starting with the keyword (case-insensitive)
                },
            },
            order: [['name', 'ASC']], // Optional: Alphabetical ordering
        });

        if (skills.length === 0) {
            return res.status(404).json({ message: 'No skills found.' });
        }

        res.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


/**
 * Assign a skill to the authenticated employee
 */
export const addSkillToEmployee = async (req, res) => {
    try {
        const { skillId } = req.body;

        // Get the authenticated employee
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found.' });
        }

        // Check if the skill exists
        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found.' });
        }

        // Create the association
        await EmployeeSkill.create({ employeeId: employee.id, skillId });
        res.status(201).json({ message: 'Skill assigned to employee successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get all skills for the authenticated employee
 */
export const getSkillsForEmployee = async (req, res) => {
    try {
        // Get the authenticated employee
        const employee = await Employee.findOne({
            where: { userId: req.user.userId },
            include: {
                model: Skill,
                through: { attributes: [] }, // Exclude the join table data
            },
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found.' });
        }

        res.status(200).json({ skills: employee.Skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Remove a skill from the authenticated employee
 */
export const removeSkillFromEmployee = async (req, res) => {
    try {
        const { skillId } = req.body;

        // Get the authenticated employee
        const employee = await Employee.findOne({
            where: { userId: req.user.userId }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee profile not found.' });
        }

        // Remove the skill association
        const deleted = await EmployeeSkill.destroy({
            where: { employeeId: employee.id, skillId }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Skill not found for this employee.' });
        }

        res.status(200).json({ message: 'Skill removed from employee successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Update a skill
 */
export const updateSkill = async (req, res) => {
    try {
        const { skillId } = req.params;
        const { name } = req.body;

        const [updated] = await Skill.update({ name }, { where: { id: skillId } });

        if (!updated) {
            return res.status(404).json({ message: 'Skill not found.' });
        }

        res.status(200).json({ message: 'Skill updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Delete a skill
 */
export const deleteSkill = async (req, res) => {
    try {
        const { skillId } = req.params;

        const deleted = await Skill.destroy({ where: { id: skillId } });

        if (!deleted) {
            return res.status(404).json({ message: 'Skill not found.' });
        }

        res.status(200).json({ message: 'Skill deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
