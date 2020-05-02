const userController = require('../db/controllers/user.controller');

exports.ensureAuthenticated = async (req, res, next) => {
  const user = await userController.get(req.user.id);
  if (user) return next();
  res.redirect('/login')
}

exports.ensureAuthenticatedApi = async (req, res, next) => {
  const user = await userController.get(req.user.id);
  if (user) return next();
  res.status(401).json({ error: 'You need to login as a tutor first' });
}

exports.ensureNotAuthenticated = async (req, res, next) => {
  const user = await userController.get(req.user.id);
  if (!user) return next();
  res.redirect('/dashboard')
}