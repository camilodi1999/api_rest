var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 * depency to load the environment variables specified
 * in the .env file
 */
require('dotenv').config()

/**
 *  users route dependency
 */
const usersRouter = require('./routes/usersRoute');

/**
 *  creates express app
 */
const app = express();

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
