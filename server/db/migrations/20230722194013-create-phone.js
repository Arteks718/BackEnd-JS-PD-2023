"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
        type: DataTypes.FLOAT(3,3),
        isFloat: true
      },
      cpu: DataTypes.STRING,
      screen_diagonal: {
        type: DataTypes.FLOAT(3,3),
        validate: {
          isFloat: true
        }
      },
      is_nfc: {
        type: DataTypes.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phones");
  },
};
