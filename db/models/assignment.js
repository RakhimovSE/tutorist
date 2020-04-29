'use strict';

module.exports = (sequelize, DataTypes) => {
    const Assignment = sequelize.define('Assignment', {
        title : DataTypes.STRING,
        type : DataTypes.STRING,
        instructions: DataTypes.TEXT,
        archived : DataTypes.BOOLEAN,
        deleted : DataTypes.BOOLEAN,
        data : DataTypes.STRING
    }, {});
    Assignment.associate = (models) => {
        Assignment.belongsToMany(models.StudentAssignment, {through: 'AssignmentRelation'});
    };
    return Assignment;
};

