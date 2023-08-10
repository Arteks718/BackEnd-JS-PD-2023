'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 64]
        }
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 64]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password_hash: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
          isBefore: new Date().toLocaleDateString()
        }
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other')
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
}; 