'use strict';
const {DataTypes} = require('sequelize'); 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          isAfter: true
        }
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          isAfter: true
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [6, 20]
        }
      },
      passwordHash: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};