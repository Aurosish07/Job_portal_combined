import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";

const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    technologiesUsed: { type: DataTypes.STRING },
    duration: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    projectURL: { type: DataTypes.STRING },
    employeeId: {  // Foreign key to Employee
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    }
}, { timestamps: true });

Employee.hasMany(Project, { foreignKey: 'employeeId' });
Project.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Project;
