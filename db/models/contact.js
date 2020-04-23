'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    contactType_id: DataTypes.INTEGER
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};