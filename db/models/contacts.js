'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contacts', {
    contactTypeId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
  }, {});
  Contact.associate = function(models) {
    Contact.belongsTo(models.Students);
    Contact.belongsTo(models.ContactTypes);
  };
  return Contact;
};