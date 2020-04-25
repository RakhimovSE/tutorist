'use strict';

module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    tutorId: DataTypes.INTEGER,
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    //relatedStudentId: DataTypes.INTEGER,
  }, {});
  Students.associate = function(models) {
    Students.hasMany(models.Contacts);
  };
  return Students;
};
