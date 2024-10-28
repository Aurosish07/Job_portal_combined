import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js';

const Auth = sequelize.define('Auth', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type:DataTypes.STRING,
        // defaultValue:'user',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
});


User.hasOne(Auth, { foreignKey: 'userId' });
Auth.belongsTo(User, { foreignKey: 'userId' });

export default Auth;