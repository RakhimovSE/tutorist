'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    tutorId: DataTypes.INTEGER,
    archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.User, { foreignKey: 'tutorId', as: 'tutor' })
    Student.hasMany(models.Contact, { foreignKey: 'studentId' });
  };
  return Student;
};
