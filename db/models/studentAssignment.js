'use strict';

module.exports = (sequelize, DataTypes) => {
    const StudentAssignment = sequelize.define('StudentAssignment', {
        student  : DataTypes.INTEGER,
        assignment : DataTypes.INTEGER,
        dueDate: DataTypes.DATE,
        points : DataTypes.INTEGER,
        note : DataTypes.TEXT
    }, {});
    StudentAssignment.associate = (models) => {
        // associations can be defined here
    };
    return StudentAssignment;
};