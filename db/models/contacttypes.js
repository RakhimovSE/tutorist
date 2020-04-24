'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactType = sequelize.define('ContactTypes', {
    name: DataTypes.STRING
  }, {});
  ContactType.associate = function(models) {
    ContactType.belongsTo(models.Contacts)
  };
  return ContactType;
};