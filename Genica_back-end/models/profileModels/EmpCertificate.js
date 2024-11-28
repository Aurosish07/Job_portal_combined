import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";


const Certification = sequelize.define('Certification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    issuingOrganization: { type: DataTypes.STRING },
    completionDate: { type: DataTypes.DATE },
    certificationURL: { type: DataTypes.STRING },
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

Employee.hasMany(Certification, { foreignKey: 'employeeId' });
Certification.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Certification;
