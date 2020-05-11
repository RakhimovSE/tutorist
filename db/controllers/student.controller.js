const { Student, Contact, ContactType } = require('~root/db/models');

function updatePhoto(photoFile) {

}

exports.get = (studentId) => {
  return Student.findByPk(studentId, {
    where: {
      deleted: false,
      archived: false
    },
    include: [{
      model: Contact,
      where: {
        deleted: false,
        archived: false
      },
      required: false,
      order: ['contactTypeId'],
      include: { model: ContactType }
    }]
  });
};

exports.list = (tutorId) => {
  return Student.findAll({
    where: {
      tutorId: tutorId,
      deleted: false,
      archived: false
    },
    include: [{
      model: Contact,
      where: {
        deleted: false,
        archived: false
      },
      required: false,
      include: { model: ContactType }
    }],
    order: ['firstName']
  });
};

exports.create = async (data) => {
  let student = await Student.create(data);
  const newPhotoUrl = data.photoUrl === '' ? `/images/avatars/${student.id}.jpg` : data.photoUrl;
  await exports.update(student.id, { photoUrl: newPhotoUrl });
  if (data.Contacts.length > 0) {
    data.Contacts.forEach(contact => contact.studentId = student.id);
    await exports.bulkCreate(data.Contacts);
  }

  return student;
};

exports.bulkCreate = (data) => {
  return Student.bulkCreate(data);
}

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