const { parsed: dotenv } = require('dotenv').config();
let express = require('express');
let router = express.Router();
let passport = require('passport');

let userController = require('../db/controllers/user.controller');

let { Strategy: GoogleStrategy } = require('passport-google-oauth20');

let googleScope = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/userinfo.email',
];

/***************/
/** СТРАТЕГИИ **/
/***************/

passport.use(new GoogleStrategy({
    clientID: dotenv.GOOGLE_CLIENT_ID,
    clientSecret: dotenv.GOOGLE_CLIENT_SECRET,
    callbackURL: dotenv.GOOGLE_REDIRECT_URL,
  },
  (accessToken, refreshToken, profile, cb) => {
    userController.create(profile);
    return cb(null, profile);
  }));

/******************/
/** СЕРИАЛИЗАЦИЯ **/
/******************/

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

/************/
/** РОУТЕР **/
/************/

router.get('/google', passport.authenticate('google', { scope: googleScope }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  });

module.exports = router;
