const { parsed: dotenv } = require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('./helpers');

const userController = require('../db/controllers/user.controller');

const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: VKontakteStrategy } = require('passport-vkontakte');
const { Strategy: YandexStrategy } = require('passport-yandex');

/***************/
/** СТРАТЕГИИ **/
/***************/

passport.use(new GoogleStrategy({
    clientID: dotenv.GOOGLE_CLIENT_ID,
    clientSecret: dotenv.GOOGLE_CLIENT_SECRET,
    callbackURL: dotenv.GOOGLE_REDIRECT_URL,
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  },
  (accessToken, refreshToken, profile, done) => {
    userController.create(profile).then(([user, created]) => {
      return done(null, user);
    });
  }));

passport.use(new VKontakteStrategy({
    clientID: dotenv.VKONTAKTE_APP_ID,
    clientSecret: dotenv.VKONTAKTE_APP_SECRET,
    callbackURL: dotenv.VKONTAKTE_CALLBACK_URL,
    scope: ['email'],
    profileFields: ['photo_max'],
  },
  (accessToken, refreshToken, params, profile, done) => {
    const profileWithEmail = { email: params.email, ...profile };
    userController.create(profileWithEmail).then(([user, created]) => {
      return done(null, user);
    });
  }
));

passport.use(new YandexStrategy({
    clientID: dotenv.YANDEX_CLIENT_ID,
    clientSecret: dotenv.YANDEX_CLIENT_SECRET,
    callbackURL: dotenv.YANDEX_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    userController.create(profile).then(([user, created]) => {
      return done(null, user);
    })
  }
));

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

router.get('/google', helpers.ensureNotAuthenticated, passport.authenticate('google'));

router.get(
  '/google/callback',
  helpers.ensureNotAuthenticated,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  });

router.get('/vkontakte', helpers.ensureNotAuthenticated, passport.authenticate('vkontakte'));

router.get(
  '/vkontakte/callback',
  helpers.ensureNotAuthenticated,
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/yandex', helpers.ensureNotAuthenticated, passport.authenticate('yandex'));

router.get(
  '/yandex/callback',
  helpers.ensureNotAuthenticated,
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
