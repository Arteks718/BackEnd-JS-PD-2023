'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      Hero.belongsToMany(models.Power, {
        through: 'hero_powers',
        foreignKey: 'hero_id'
      })
    }
  }
  Hero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    realName: DataTypes.STRING,
    originDescription: DataTypes.STRING,
    catchPhrase: DataTypes.STRING,
    image: DataTypes.STRING,
    isGood: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Hero',
    tableName: 'heroes'

  });
  return Hero;
};