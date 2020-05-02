let express = require('express');
let router = express.Router();
let helpers = require('../helpers');

const studentController = require('../../db/controllers/student.controller');

router.get('/', helpers.ensureAuthenticatedApi, async (req, res) => {
  const students = await studentController.list(req.user.id);
  res.status(200).json(students);
});

router.post('/create', helpers.ensureAuthenticatedApi, async (req, res) => {
  const data = { ...req.body, tutorId: req.user.id };
  const student = await studentController.create(data);
  res.status(200).json(student);
})

router.put('/update/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  const student = await studentController.update(req.params.id, req.body);
  res.status(200).json(student);
})

router.delete('/delete/:id', helpers.ensureAuthenticatedApi, async (req, res) => {
  await studentController.delete(req.params.id);
  res.status(200).json({ message: 'Student has been deleted' });
})

module.exports = router;