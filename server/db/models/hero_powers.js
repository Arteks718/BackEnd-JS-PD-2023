'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroPowers extends Model {
    static associate(models) {
      // define association here
    }
  }
  HeroPowers.init({
    heroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hero',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    powerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Power',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    origin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HeroPowers',
    tableName: 'hero_powers'
  });
  return HeroPowers;
};