// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db";
// import User from "./userModel";

// const EmployeeProfile = sequelize.define('EmployeeProfile', {

//     id: {

//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true

//     },
//     email: {

//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         references:{
//             model:User,
//             key: 'email'
//         }

//     },



// }) 

// User.hasOne(EmployeeProfile , {foreignKey: 'email'});
// EmployeeProfile.belongsTo(User , {foreignKey:'email'});