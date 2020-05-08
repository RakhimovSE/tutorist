let express = require('express');
let router = express.Router();
let appRoot = require('app-root-path');
let path = require('path');
let helpers = require('~root/routes/helpers');
let jimp = require('jimp');

const studentController = require('~root/db/controllers/student.controller');
const contactController = require('~root/db/controllers/contact.controller');

router.get('/', helpers.ensureAuthenticatedApi, async (req, res) => {
  const students = await studentController.list(req.user.id);
  res.status(200).json(students);
});

router.post('/create', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = { firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  middleName: req.body.middleName,
                  role: req.body.role,
                  tutorId: req.user.id };
  let student = await studentController.create(data);
  console.log(req.body.photoUrl);
  const newPhotoUrl = req.body.photoUrl == '' ? `../../../images/avatars/${student.id}.jpg` : req.body.photoUrl;
  await studentController.update(student.id, { photoUrl: newPhotoUrl });
  if (req.body.Contacts.length > 0) {
    req.body.Contacts
        .map(contact => contact.studentId = student.id);
    await contactController.bulkCreate(req.body.Contacts);
  }
  res.status(200).json(student);
})

router.put('/update/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = { firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    photoUrl: req.body.photoUrl,
    role: req.body.role,
    };
    let ret = await studentController.update(req.params.id, data);
    let student = await studentController.get(req.params.id);
    let arr1 = student.Contacts
        .map(v => v.id);
    let arr2 = req.body.Contacts
        .map(v => v.id);
    arr1
        .filter(id => !arr2.includes(id))
        .forEach(id => {
          contactController.update(id, {deleted: true})
        });
    if (req.body.Contacts.length > 0) {
    req.body.Contacts
        .map(contact => contact.studentId = req.params.id);
      await contactController.bulkCreate(req.body.Contacts, {
        fields: ["id", "studentId", "contactTypeId", "value", "description", "createdAt", "updatedAt"],
        updateOnDuplicate: ["studentId", "contactTypeId", "value", "description", "updatedAt"]
      })
          .catch(err=> console.log(err));
  }
  res.status(200).json(ret);
})

router.delete('/delete/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  await studentController.delete(req.params.id);
  res.status(200).json({ message: 'Student has been deleted' });
})

router.post('/saveImage/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const fileInput = req.files.fileInput;

  jimp.read(fileInput.data, (err, image) => {
    if (err) throw err;
    let len = image.bitmap.height < image.bitmap.width ? image.bitmap.height : image.bitmap.width;
    let fixHeight = len == image.bitmap.height ? false : true;
    let x = fixHeight ? 0: image.bitmap.width / 2 - len / 2;
    let y = fixHeight ? image.bitmap.height / 2 - len / 2: 0;
    image
        .crop(x, y, len, len)
        .quality(60)
        .write(path.join(appRoot.path, 'public', 'images', 'avatars', `${req.params.id}.jpg`));
  })
})

module.exports = router;