'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.Classes)
      // define association here
    }
  }
  Topic.init({
    caption: DataTypes.STRING,
    classId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};