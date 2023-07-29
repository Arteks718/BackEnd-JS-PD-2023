'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      Classes.hasMany(models.Topic,{
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
      // define association here
    }
  }
  Classes.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Classes',
    underscored: true
  });
  return Classes;
};