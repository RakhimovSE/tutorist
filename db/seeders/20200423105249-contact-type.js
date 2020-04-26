'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ContactTypes', [
      { name: 'tel' },
      { name: 'email' },
      { name: 'skype' },
      { name: 'url' },
      { name: 'other' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ContactTypes', null, {});
  }
};
