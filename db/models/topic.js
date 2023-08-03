'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.hasMany(models.Task, {
        foreignKey: {
          name: 'topicId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  Topic.init({
    caption: { 
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Topic',
  });
  return Topic;
};