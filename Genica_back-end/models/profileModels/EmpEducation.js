import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";

const Education = sequelize.define('Education', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    degree: { type: DataTypes.STRING },
    courseName: { type: DataTypes.STRING },
    institution: { type: DataTypes.STRING },
    specialization: { type: DataTypes.STRING },
    gpaOrScore: { type: DataTypes.STRING },
    graduationDate: { type: DataTypes.DATE },
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

Employee.hasMany(Education, { foreignKey: 'employeeId' });
Education.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Education;