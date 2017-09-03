const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const dbService = require(__dirname + '/services/dbService')

const controller = require('./controllers/movieController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

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
hbs.registerHelper('compareTwo', function(param1, param2, options) {
    if(param1 === param2)
        return options.fn(this);
    else
        return options.inverse(this);
});


/**
 * PASSPORT
 */
//strategy for login
passport.use('local', new LocalStrategy((username, password, cb) => {
        dbService.userAuthentication(username, password, cb);
    })
);

// strategy for signup
passport.use('local-signup', new LocalStrategy((username, password, cb) => {
        dbService.insertUser(username, password, cb);
    })
);

// serialize for persistent login sessions
passport.serializeUser((user, cb) => {
    cb(null, user.username);
});

// deserialize for persistent login sessions
passport.deserializeUser((username, cb) => {
    dbService.getUser(username, (err, user) => {
        cb(err, user);
    });
});

/**
 * Middlewares
 */
// loads favicon from given directory
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// loads static files from given directory
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Passport Middlewares
 */
app.use(cookieParser());
// creates an express session
app.use(expressSession({
    secret: 'space odity',
    resave: true,
    saveUninitialized: true}));
// needed for passport use in express
app.use(passport.initialize());
// for persistent login sessions
app.use(passport.session());


/**
 * Controllers
 */
controller(app);
userController(app);
authController(app, passport);


/**
 * Handling Errors
 */
// no routes for the path requested (order matters)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
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