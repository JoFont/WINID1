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

app.use(logger('dev'));
app.use(express.json());


// TODO: Isto tem de ser revisitado porque acho que entra em conflito com o cloudflare
// const whitelist = ['http://localhost:3000', 'https://winid1.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }



//! Routes
app.use(cors());

// <== API ==>
app.use('/api', apiRouter);

// <== Index ==>
app.use(express.static(join(__dirname, '../client/build')));
app.use(serveFavicon(join(__dirname, '../client/public', 'favicon.ico')));

app.get('*', (req, res, next) => {
  res.sendFile(join(__dirname, '../client/build/index.html'));
});




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
  console.log(error);
});

module.exports = app;
