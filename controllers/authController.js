'use strict';

var dbService = require('../services/dbService');

module.exports = function(app, passport) {
    /**
     * log in endpoint: /login
     */
    app.get('/login', function(req, res, next) {
        res.render('login', { title: 'Login Page' });
    });

    app.post('/login', passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    /**
     * sign up endpoint: /signup
     */
    app.get('/signup', function(req, res, next) {
        res.render('signup', { title: 'Signup Page' });
    });

    app.post('/signup', passport.authenticate(
        'local-signup',
        {
            successRedirect: '/login',
            failureRedirect: '/signup'
        }
    ));

    /**
     * log out endpoint: /logout
     */
    app.get('/logout', function(req, res, next) {
        req.session.destroy( err => {
            if(err)
                next(err)
            res.render('homepage');
        });
    });
};