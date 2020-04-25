let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/students/add', (req, res) => {
  const data = {
    user: req.user,
  };
  res.render('addstudent', data);
});

module.exports = router;
