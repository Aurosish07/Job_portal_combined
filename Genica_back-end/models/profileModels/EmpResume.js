import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";

const Resume = sequelize.define('Resume', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    filePath: { type: DataTypes.STRING, allowNull: true },
    employeeId: {  // Foreign key to Employee
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE'
    }
}, { timestamps: true });

Employee.hasOne(Resume, { foreignKey: 'employeeId' });
Resume.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Resume;