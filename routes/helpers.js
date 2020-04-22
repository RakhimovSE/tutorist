exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

exports.ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) { return next(); }
  res.redirect('/')
}