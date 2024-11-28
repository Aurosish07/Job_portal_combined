import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";

const Experience = sequelize.define('Experience', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    companyName: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING },
    responsibilities: { type: DataTypes.TEXT },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE, allowNull: true },
    isCurrent: { type: DataTypes.BOOLEAN, defaultValue: false },
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

Employee.hasMany(Experience, { foreignKey: 'employeeId' });
Experience.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Experience;