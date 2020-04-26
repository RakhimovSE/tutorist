'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    studentId: DataTypes.INTEGER,
    contactTypeId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {});
  Contact.associate = function(models) {
    Contact.belongsTo(models.Student, { foreignKey: 'studentId' });
    Contact.belongsTo(models.ContactType, { foreignKey: 'contactTypeId' });
  };
  return Contact;
};