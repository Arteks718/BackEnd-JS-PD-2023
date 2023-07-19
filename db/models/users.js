'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        passwordHash: DataTypes.TEXT,
        userAge: DataTypes.INTEGER,
        profilePicture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
