'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        isAlpha: true, 
        len: [2, 64]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        isAlpha: true, 
        len: [2, 64]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value){
        this.setDataValue('passwordHash', hashSync(value, 10));
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isBefore: new Date().toLocaleDateString()
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['male', 'female', 'other']]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    underscored: true
  });
  return User;
};