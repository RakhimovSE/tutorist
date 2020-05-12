let express = require('express');
let router = express.Router();
let helpers = require('~root/routes/helpers');

const studentController = require('~root/db/controllers/student.controller');
const contactController = require('~root/db/controllers/contact.controller');
const contactTypeController = require('~root/db/controllers/contact-type.controller');

router.get('/', helpers.ensureAuthenticatedApi, async (req, res) => {
  const students = await studentController.list(req.user.id);
  res.status(200).json(students);
});

router.post('/create', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = {
    ...req.body,
    tutorId: req.user.id
  };
  let student = await studentController.create(data);
  res.status(200).json(student);
})

router.put('/update/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    photoUrl: req.body.photoUrl,
    role: req.body.role,
  };
  let ret = await studentController.update(req.params.id, data);
  let student = await studentController.get(req.params.id);
  let arr1 = student.Contacts.map(v => v.id);
  let arr2 = req.body.Contacts.map(v => v.id);
  arr1
    .filter(id => !arr2.includes(id))
    .forEach(id => {
      contactController.update(id, { deleted: true })
    });
  if (req.body.Contacts.length > 0) {
    req.body.Contacts
      .map(contact => contact.studentId = req.params.id);
    await contactController.bulkCreate(req.body.Contacts, {
      fields: ["id", "studentId", "contactTypeId", "value", "description", "createdAt", "updatedAt"],
      updateOnDuplicate: ["studentId", "contactTypeId", "value", "description", "updatedAt"]
    })
      .catch(err => console.log(err));
  }
  res.status(200).json(ret);
})

router.delete('/delete/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  await studentController.delete(req.params.id);
  res.status(200).json({ message: 'Student has been deleted' });
})

router.post('/updatePhoto/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }
  const [code, message] = await studentController.updatePhoto(req.params.id, req.files.fileInput);
  res.status(code).json(message)
})

router.get('/contact-types', async (req, res) => {
  const contactTypes = await contactTypeController.list();
  res.status(200).json(contactTypes);
})

module.exports = router;