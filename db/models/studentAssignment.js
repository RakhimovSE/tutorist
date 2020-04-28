'use strict';

module.exports = (sequelize, DataTypes) => {
    const StudentAssignment = sequelize.define('StudentAssignments', {
        student  : DataTypes.INTEGER,
        assignmentId : DataTypes.INTEGER,
        dueDate: DataTypes.DATE,
        points : DataTypes.INTEGER,
        archived : DataTypes.BOOLEAN,
        deleted : DataTypes.BOOLEAN,
        note : DataTypes.TEXT
    }, {});
    StudentAssignment.associate = (models) => {
        StudentAssignment.hasMany(models.assignment, { foreignKey: 'assignmentId', as: 'assignments' })
    };
    return StudentAssignment;
};