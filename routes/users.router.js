let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/students', (req, res) => {
  const data = {
    user: req.user,
  };
  res.render('students', data);
});

module.exports = router;
