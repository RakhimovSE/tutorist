let express = require('express');
let router = express.Router();

const { urlGoogle, getGoogleAccountFromCode } = require('../src/google-auth');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let params = req.query;
  let account = null;
  let googleUrl = urlGoogle();

  if (params.code) {
    await getGoogleAccountFromCode(params.code)
      .then(res => {
        account = {
          firstName: res.names[0].givenName,
          lastName: res.names[0].familyName,
          profileUrl: res.photos[0].url
        };
      })
      .catch(console.error);
  }

  const data = {
    title: 'Express',
    googleUrl,
    params,
    account
  };

  res.render('index', data);
});

module.exports = router;
