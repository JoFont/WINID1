const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const cors = require('cors');
const app = express();

// app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
// app.use(
//   expressSession({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 60 * 60 * 24 * 15,
//       sameSite: 'lax',
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production'
//     },
//     store: new (connectMongo(expressSession))({
//       mongooseConnection: mongoose.connection,
//       ttl: 60 * 60 * 24
//     })
//   }));

// require('./config/passport-config.js');
// const passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(bindUserToViewLocals);

//! Routes
app.use('/api', apiRouter);
app.use('/', indexRouter);
// app.use('/auth', authRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
