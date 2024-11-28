import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import Employee from "./EmployeeModel.js";

const Award = sequelize.define('Award', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    awardName: { type: DataTypes.STRING, allowNull: false },
    awardingOrganization: { type: DataTypes.STRING },
    dateReceived: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT },
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

Employee.hasMany(Award, { foreignKey: 'employeeId' });
Award.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Award;