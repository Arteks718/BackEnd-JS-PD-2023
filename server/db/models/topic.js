'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.Classes, {
        foreignKey: 'classId'
      })
    }
  }
  Topic.init({
    caption: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Topic',
    underscored: true,
  });
  return Topic;
};