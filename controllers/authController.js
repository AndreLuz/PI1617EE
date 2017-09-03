'use strict';

var dbService = require('../services/dbService');

module.exports = function(app, passport) {
    /**
     * user search endpoint: /user
     */
    app.get('/user', function(req, res, next) {
        res.render('user_search', {title: 'Search User' });
    });

    /**
     * user page endpoint: /user/{username}
     */
    app.get('/user/:username', function(req, res, next) {
        dbService.getUser(req.params.username, (err, data) => {
            if(err)
                return next(err);
            res.render('user',
                {
                    title: data.username + ' Profile',
                    username: data.username,
                    favourites: data.favourites
                });
        })
    });

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
            failureRedirect: '/login',
        })
    );

    /**
     * sign up endpoint: /signup
     */
    app.get('/signup', function(req, res, next) {
        res.render('signup', { title: 'Signup Page' });
    })

    /*app.post()*/
};