import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from './userModel.js';

const Resume = sequelize.define('Resume', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Name of the table
            key: 'id',
        },
    },
    resumeData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
}, {
    timestamps: true, // This adds createdAt and updatedAt columns
});

User.hasOne(Resume, { foreignKey: 'userId' });
Resume.belongsTo(User, { foreignKey: 'userId' });

export default Resume;