const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.render('index');
  }
});

router.get('/dashboard', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('dashboard', data);
});

router.get('/login', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/assignments', (req, res) => {
  const data = {
    user: req.user
  }
  res.render('assignment_form.ejs', data)
})

router.get('/StudentAssignments', (req, res) => {
  const data = {
    user: req.user
  }
  res.render('studentAssignment_form.ejs', data)
})

module.exports = router;
