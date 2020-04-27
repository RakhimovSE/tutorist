'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Assignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            instructions: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            data: {
                allowNull: false,
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Assignments');
    }
};
