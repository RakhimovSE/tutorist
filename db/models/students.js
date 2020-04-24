'use strict';
module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define('Students', {
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    //relatedStudentId: DataTypes.INTEGER,
  }, {});
  Students.associate = function(models) {
    Students.hasMany(models.Contacts);
  };
  return Students;
};