'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        const fullName = [this.firstName];
        if (this.middleName) fullName.push(this.middleName);
        if (this.lastName) fullName.push(this.lastName);
        return fullName.join(' ');
      }
    },
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
