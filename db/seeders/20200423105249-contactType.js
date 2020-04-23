'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ContactType', [{
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
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ContactType', null, {});
  }
};
