'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentsSubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id'
        }
      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id'
        }
      },
      subcategory: {
        type: Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentsSubjects');
  }
};