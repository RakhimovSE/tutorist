const express = require('express');
const router = express.Router();
const helpers = require('./helpers');
const studentController = require('~root/db/controllers/student.controller');

router.get('/', helpers.ensureAuthenticated, (req, res) => {
  const data = {
    user: req.user
  };
  res.render('material-dashboard/students', data);
})

router.get('/new', helpers.ensureAuthenticated, (req, res) => {
  const data = {
    user: req.user,
    student: {
      firstName: '',
      lastName: '',
      photoUrl: '',
      role: 'student',
      tutorId: -1,
      Contacts: []
    }
  };
  res.render('material-dashboard/student-new', data);
})

router.get('/:id', helpers.ensureAuthenticated, async (req, res) => {
  let student = await studentController.get(req.params.id);
  const data = {
    user: req.user,
    student: student
  };
  res.render('material-dashboard/student-profile', data);
})

router.get('/:id/edit', helpers.ensureAuthenticated, async (req, res) => {
  let student = await studentController.get(req.params.id);
  const data = {
    user: req.user,
    student: student,
  };
  res.render('material-dashboard/student-profile-edit', data);
})

module.exports = router;