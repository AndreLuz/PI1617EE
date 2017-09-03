'use strict';

var dbService = require('../services/dbService');

module.exports = function(app) {
    /**
     * user search endpoint: /user
     */
    app.get('/user', function(req, res, next) {
        res.render('user_search', {
            title: 'Search User',
            user: req.user
        });
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
                    user: req.user,
                    username: data.username,
                    favourites: data.favourites
                });
        });
    });

    /**
     * add favourite endpoint: /favourite/add
     */
    app.post('/favourite/add', function(req, res, next) {
        dbService.addFavourite(req.user, req.body.movie, (err, data) => {
            if(err)
                return next(err);
            res.status(200).send(data);
        })
    });

    /**
     * remove favourite endpoint: /favourite/remove
     */
    app.post('/favourite/remove', function(req, res, next) {
        dbService.removeFavourite(req.user, req.body.movie_id, (err, data) => {
            if(err)
                return next(err);
            res.status(200).send(data);
        })
    });
};