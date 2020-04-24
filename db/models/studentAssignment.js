'use strict';

module.exports = (sequelize, DataTypes) => {
    const StudentAssignment = sequelize.define('StudentAssignments', {
        student  : DataTypes.INTEGER,
        assignment : DataTypes.INTEGER,
        dueDate: DataTypes.DATE,
        points : DataTypes.INTEGER,
        archived : DataTypes.Boolean,
        deleted : DataTypes.Boolean,
        note : DataTypes.TEXT
    }, {});
    StudentAssignment.associate = (models) => {
        // associations can be defined here
    };
    return StudentAssignment;
};