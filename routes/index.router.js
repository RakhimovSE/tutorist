const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.render('material-kit/index');
  }
});

router.get('/login-page', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/login-page');
});

router.get('/landing-page', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/landing-page');
});

router.get('/profile-page', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/profile-page');
});

router.get('/dashboard', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/dashboard', data);
});

router.get('/user', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/user', data);
});

router.get('/tables', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/tables', data);
});

router.get('/typography', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/typography', data);
});

router.get('/icons', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/icons', data);
});

router.get('/maps', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/maps', data);
});

router.get('/notifications', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/notifications', data);
});

router.get('/upgrade', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/upgrade', data);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
