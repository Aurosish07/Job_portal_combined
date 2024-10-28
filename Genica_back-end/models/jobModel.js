import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from './userModel.js';

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    requirements: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    company: {

        type: DataTypes.STRING,
        allowNull:true,

    },
    employerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});


User.hasMany(Job, { foreignKey: 'employerId' });
Job.belongsTo(User, { foreignKey: 'employerId' });

export default Job;