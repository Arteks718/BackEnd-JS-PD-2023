'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Power extends Model {
    static associate(models) {
      Power.belongsToMany(models.Hero, {
        through: 'hero_powers',
        foreignKey: 'power_id'
      })
    }
  }
  Power.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Power',
    underscored: true
  });
  return Power;
};