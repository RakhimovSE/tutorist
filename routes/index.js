let express = require('express');
let router = express.Router();

const { urlGoogle, getGoogleAccountFromCode } = require('../src/google-auth');
const userController = require('../db/controllers/user.controller');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let params = req.query;
  let account = null;
  let googleUrl = urlGoogle();

  if (params.code) {
    account = await getGoogleAccountFromCode(params.code)
      .catch(console.error);
    userController.create(account);
  }

  const data = {
    title: 'Express',
    googleUrl,
    params,
    account,
  };

  res.render('index', data);
});

module.exports = router;
