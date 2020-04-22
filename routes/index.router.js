const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  const data = {
    user: req.user,
  };

  res.render('index', data);
});

router.get('/login', helpers.ensureNotAuthenticated, async (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
