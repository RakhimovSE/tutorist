exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

exports.ensureAuthenticatedApi = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).json({ error: 'You need to login as a tutor first' });
}

exports.ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) { return next(); }
  res.redirect('/dashboard')
}