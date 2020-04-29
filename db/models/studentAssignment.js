'use strict';

module.exports = (sequelize, DataTypes) => {
    const StudentAssignment = sequelize.define('StudentAssignment', {
        student  : DataTypes.INTEGER,
        assignment : DataTypes.INTEGER,
        dueDate: DataTypes.DATE,
        points : DataTypes.INTEGER,
        archived : DataTypes.BOOLEAN,
        deleted : DataTypes.BOOLEAN,
        note : DataTypes.TEXT
    }, {});
    StudentAssignment.associate = (models) => {
        StudentAssignment.belongsToMany(models.Assignment, {through: 'AssignmentRelation', foreignKey : 'StudentAssignmentId'});
    };
    return StudentAssignment;
};