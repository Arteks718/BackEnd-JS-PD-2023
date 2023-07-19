'use strict';
const bcrypt = require('bcrypt');
const generateTestUsers = () => {
  const users = []
  for(let i = 0; i < 100; i++) {
    users.push({        
      firstName: `firstName${i}`,
      lastName: `lastName${i}`,
      email: `name${i}@mail.com`,
      login: `login${i}`,
      passwordHash: bcrypt.hashSync(`admin${i}`, 10)
    })
  }
  return users;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', generateTestUsers(), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
