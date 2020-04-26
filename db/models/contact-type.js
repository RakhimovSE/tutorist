'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactType = sequelize.define('ContactType', {
    name: DataTypes.STRING
  }, { timestamps: false });
  ContactType.associate = function (models) {

  };
  return ContactType;
};