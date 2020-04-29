'use strict';

module.exports = (sequelize, DataTypes) => {
    const AssignmentRelation = sequelize.define('assignmentRelation', {}, {});
    AssignmentRelation.associate = (models) => {
        AssignmentRelation.belongsTo(models.StudentAssignment);
        AssignmentRelation.belongsTo(models.Assignment);
    };
    return AssignmentRelation;
};