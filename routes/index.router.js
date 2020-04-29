const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('material-kit/index');
  }
});

router.get('/login', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/login');
});

router.get('/landing-page', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/landing-page');
});

router.get('/profile-page', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('material-kit/profile-page');
});

router.get('/docs', async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('material-dashboard/docs');
  } else {
    res.render('material-kit/docs');
  }
});

router.get('/dashboard', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/dashboard', data);
});

router.get('/profile', helpers.ensureAuthenticated, async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('material-dashboard/profile', data);
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
