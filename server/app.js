const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const apiRouter = require('./routes/api');
const cors = require('cors');
const app = express();

// Initialize Firebase admin
require("./services/firebase-admin");

// app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());


//! Routes
app.use('/api', apiRouter);
app.get("/", (req, res, next) => {
  res.sendFile(join(__dirname, "../client/public/build/index.html"));
})

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
