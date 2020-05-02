const express = require('express');
const router = express.Router();
const helpers = require('./helpers');
const studentController = require('../db/controllers/student.controller');

router.get('/', helpers.ensureAuthenticated, (req, res) => {
  const data = {
    user: req.user
  };
  res.render('material-dashboard/students', data);
})

router.get('/new', helpers.ensureAuthenticated, (req, res) => {
  const data = {
    user: req.user,
    student: {},
  };
  res.render('material-dashboard/student-new', data);
})

router.get('/:id', helpers.ensureAuthenticated, async (req, res) => {
  const data = {
    user: req.user,
    student: await studentController.get(req.params.id),
  };
  res.render('material-dashboard/student-profile', data);
})

router.get('/:id/edit', helpers.ensureAuthenticated, async (req, res) => {
  const data = {
    user: req.user,
    student: await studentController.get(req.params.id),
  };
  res.render('material-dashboard/student-profile-edit', data);
})

router.get('/new', helpers.ensureAuthenticated, (req, res) => {
  const data = {
    user: req.user
  };
  res.render('material-dashboard/student-new', data);
})

module.exports = router;