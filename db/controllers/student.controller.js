const { Student, Contact, ContactType } = require('~root/db/models');
const contactController = require('~root/db/controllers/contact.controller');

let path = require('path');
let appRoot = require('app-root-path');
let jimp = require('jimp');

exports.updatePhoto = async (studentId, fileInput) => {
  try {
    await jimp.read(fileInput.data, (err, image) => {
      if (err) throw err;
      let len = image.bitmap.height < image.bitmap.width ? image.bitmap.height : image.bitmap.width;
      let fixHeight = len !== image.bitmap.height;
      let x = fixHeight ? 0 : image.bitmap.width / 2 - len / 2;
      let y = fixHeight ? image.bitmap.height / 2 - len / 2 : 0;
      image
        .crop(x, y, len, len)
        .quality(60)
        .write(path.join(appRoot.path, 'public', 'images', 'avatars', `${studentId}.jpg`));
    })

    return [200, { message: 'File has been uploaded successfully' }];
  } catch (e) {
    return [400, { message: e }];
  }
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
  data.Contacts.forEach(contact => contact.studentId = student.id);
  await contactController.bulkCreate(data.Contacts);

  return student;
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