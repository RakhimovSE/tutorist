let express = require('express');
let router = express.Router();
let helpers = require('../helpers');

const studentController = require('../../db/controllers/student.controller');
const contactController = require('../../db/controllers/contact.controller');

router.get('/', helpers.ensureAuthenticatedApi, async (req, res) => {
  const students = await studentController.list(req.user.id);
  res.status(200).json(students);
});

router.post('/create', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = { firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  middleName: req.body.middleName,
                  photoUrl: req.body.photoUrl,
                  role: req.body.role,
                  tutorId: req.user.id };
  let student = await studentController.create(data);
  let contacts = {};
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
    let toDelete = arr1
        .filter(id => !arr2.includes(id))
        .forEach(id => {
          contactController.update(id, {deleted: true})
        });
    console.log(toDelete);
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

router.post('/saveImage', helpers.ensureAuthenticatedApi, async (req, res) => {
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const fileName = req.files.fileInput.name;
  console.log(req.files.name);
  const path = __dirname + '/images/' + fileName

  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
})

module.exports = router;