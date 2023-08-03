'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      topic_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'topics',
          id: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      deadline: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};