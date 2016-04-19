/**
* @Author: tilpa
* @Date:   2016-04-16T13:26:03+10:00
* @Last modified by:   nxtonic
* @Last modified time: 2016-04-17T18:39:02+10:00
*/

'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// establish connection to db.
const mongoose = require('mongoose');
var dbName = process.env.DATABASE_NAME || 'application';
const db = mongoose.connection;
mongoose.connect('mongodb://db/' + dbName);
db.on('error', console.error.bind(console, 'connection error:'));

// import routers
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

// initialise application and add locals for templates.
var app = express();
app.locals.moment = require('moment');
app.locals.ageCalculator = require("age-calculator");

// configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// configure general application middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

// Make db accessible to router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// attach routers to application
app.use('/', routes);
app.use('/users', users);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
