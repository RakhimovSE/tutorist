'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ContactTypes', [{
              name: 'tel',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'email',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'skype',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'url',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'other',
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ContactTypes', null, {});
  }
};
