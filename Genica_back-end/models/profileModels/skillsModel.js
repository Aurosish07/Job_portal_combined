import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";


const Skill = sequelize.define('Skill', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { timestamps: false });

const EmployeeSkill = sequelize.define('EmployeeSkill', {
    employeeId: {  // Foreign key to Employee
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    skillId: {  // Foreign key to Skill
        type: DataTypes.INTEGER,
        references: {
            model: Skill,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, { timestamps: false });

Employee.belongsToMany(Skill, { through: EmployeeSkill, foreignKey: 'employeeId' });
Skill.belongsToMany(Employee, { through: EmployeeSkill, foreignKey: 'skillId' });

export { Skill, EmployeeSkill };
