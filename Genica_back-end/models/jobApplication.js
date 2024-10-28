import Job from "./jobModel.js";
import User from "./userModel.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const JobApplication = sequelize.define('JobApplication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Job, // 'Jobs' refers to table name
            key: 'id', // 'id' refers to column name in Jobs table
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 'Users' refers to table name
            key: 'id', // 'id' refers to column name in Users table
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // possible values: pending, accepted, rejected
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

User.hasMany(JobApplication, { foreignKey: 'userId' });
JobApplication.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(JobApplication, { foreignKey: 'jobId' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId' });

export default JobApplication;