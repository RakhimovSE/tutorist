'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactType = sequelize.define('ContactType', {
    name: DataTypes.STRING
  }, {});
  ContactType.associate = function(models) {
    // associations can be defined here
  };
  return ContactType;
};