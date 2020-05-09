let createError = require('http-errors');
let express = require('express');
let sassMiddleware = require('node-sass-middleware');
let path = require('path');
let cookieSession = require('cookie-session')
let passport = require('passport');
let logger = require('morgan');
let fileUpload = require('express-fileupload')

/*****************/
/** VIEW ROUTER **/
/*****************/
let indexRouter = require('./routes/index.router');
let authRouter = require('./routes/auth.router');
let studentsRouter = require('./routes/students.router');

/****************/
/** API ROUTER **/
/****************/
let studentsApiRouter = require('./routes/api/students.api.router');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({ secret: process.env.SESSION_SECRET }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  outputStyle: 'extended',
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/api/students', studentsApiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
