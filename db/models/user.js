'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    profileId: DataTypes.STRING,
    profileProvider: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Student, { foreignKey: 'tutorId' });
  };
  return User;
};