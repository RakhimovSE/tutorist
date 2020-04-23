'use strict';

module.exports = (sequelize, DataTypes) => {
    const Assignment = sequelize.define('Assignment', {
        title : DataTypes.STRING,
        instructions: DataTypes.TEXT,
        type : DataTypes.STRING,
        data : DataTypes.STRING
    }, {});
    Assignment.associate = (models) => {
        // associations can be defined here
    };
    return Assignment;
};