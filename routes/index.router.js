let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = {
    title: 'Express',
    user: req.user,
  };

  res.render('index', data);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
