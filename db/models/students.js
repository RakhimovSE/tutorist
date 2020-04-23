'use strict';
module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define('Students', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    relatedStudent: DataTypes.STRING
  }, {});
  Students.associate = function(models) {
    // associations can be defined here
  };
  return Students;
};