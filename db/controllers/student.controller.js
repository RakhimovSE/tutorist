const { Student } = require('../models');

exports.get = (studentId) => {
  return Student.findByPk(studentId, {
    where: {
      deleted: false,
      archived: false
    }
  });
};

exports.list = (tutorId) => {
  return Student.findAll({
    where: {
      tutorId: tutorId,
      deleted: false,
      archived: false
    }
  });
};

exports.create = (data) => {
  return Student.create(data);
};

exports.update = (studentId, data) => {
  return Student.update(data, {
    where: { id: studentId }
  });
};

exports.delete = async (studentId) => {
  await Student.update({ deleted: true }, {
    where: { id: studentId }
  });
  return true;
}