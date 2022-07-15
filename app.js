var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 *  users route dependency
 */
var usersRouter = require('./routes/usersRoute');

/**
 *  creates express app
 */
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Creates the users Router
 */
app.use('/', usersRouter);

module.exports = app;
