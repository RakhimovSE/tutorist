'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contacts', {
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    contactTypeId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    studentId: DataTypes.INTEGER
  }, {});
  Contact.associate = function(models) {
    Contact.belongsTo(models.Students);
    Contact.belongsTo(models.ContactTypes);
  };
  return Contact;
};