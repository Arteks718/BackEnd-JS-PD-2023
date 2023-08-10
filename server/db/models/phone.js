'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Phones.init({
    model: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 128]
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 128]
      }
    },
    production_year: {
      type:DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: new Date(0).getFullYear(),
        max: new Date().getFullYear()
      }
    },
    ram: {
      type: DataTypes.NUMBER,
      isFloat: true
    },
    cpu: DataTypes.STRING,
    screen_diagonal: {
      type: DataTypes.NUMBER,
      validate: {
        isFloat: true
      }
    },
    is_nfc: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    underscored: true,
    modelName: 'phones',
  });
  return Phones;
};