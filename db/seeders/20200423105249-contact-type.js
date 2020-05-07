'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ContactTypes', [
      { name: 'Телефон' },
      { name: 'Email' },
      { name: 'Skype' },
      { name: 'URL' },
      { name: 'Другое' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ContactTypes', null, {});
  }
};
