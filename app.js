const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const controller = require('./controllers/controller');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/**
 * Configure Express
 */
// set directory for views
app.set('views', path.join(__dirname + '/views'));
// set extension for views
app.set('view engine', 'hbs');
// register partials
hbs.registerPartials(__dirname + '/views/partials');


/**
 * Middlewares
 */
// loads favicon from given directory
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// loads static files from given directory
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Add Routes
 */
controller(app);


/**
 * Handling Errors
 */

// no routes for the path requested (order matters)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

// API key = c1369884d0ef11d7a69a7fb32a80b8e9
// https://api.themoviedb.org/3/movie/550?api_key=c1369884d0ef11d7a69a7fb32a80b8e9
