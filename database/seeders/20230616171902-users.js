'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      firstName: 'Sunil',
      lastName: 'Gopal',
      email: 'sunil@gmail.com',
      password: bcrypt.hashSync('secret', 10),
      gender: 'male'
   },

   {
   firstName: 'Abdul',
   lastName: 'Suel',
   email: 'abdu@gmail.com',
   password: bcrypt.hashSync('secret', 10),
   gender: 'male'
}

  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
