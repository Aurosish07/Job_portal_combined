import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js"
import User from "../userModel.js";

const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: DataTypes.STRING },
    residency: { type: DataTypes.STRING },
    profileSummary: { type: DataTypes.TEXT(DataTypes.STRING) },
    preferredWorkLocation: { type: DataTypes.ARRAY(DataTypes.STRING) },
    preferredJobType: { type: DataTypes.STRING },
    preferredWorkTime: { type: DataTypes.STRING },
    workEnvironment: { type: DataTypes.STRING },
    userId: {  // Foreign key to User
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    }
}, { timestamps: true });

User.hasOne(Employee, { foreignKey: 'userId' });
Employee.belongsTo(User, { foreignKey: 'userId' });

export default Employee;
