'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('StudentAssignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            student: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            assignment: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            points: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            note: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            dueDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            archived: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            deleted: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('StudentAssignments');
    }
};

