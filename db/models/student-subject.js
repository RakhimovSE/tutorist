'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    subcategory: DataTypes.STRING
  }, {tableName:'StudentsSubjects'});
  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Student, { foreignKey: 'studentId' });
    StudentSubject.belongsTo(models.Subject, { foreignKey: 'subjectId' });
  };
  return StudentSubject;
};