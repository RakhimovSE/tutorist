'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    profileId: DataTypes.STRING,
    profileProvider: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};