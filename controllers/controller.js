'use strict';

var apiService = require('../services/apiService');

module.exports = function(app) {

    /**
     * homepage endpoint: /
     */
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Movie Search' });
    });

    /**
     * user page endpoint: /user
     */
    app.get('/user/:id', function(req, res, next) {

    });

    /**
     * endpoint 1: /movies?name=...&page=...
     */
    app.get('/movies', function(req, res, next) {
        const name = req.query.name;
        let page = '1';
        if (Object.prototype.hasOwnProperty.call(req.query, 'page'))
            page = req.query.page
        apiService.searchService(name, page, (err, data, pagination) => {
            if(err)
                return next(err);
            res.render('movies_list',
                {
                    title: 'Search Results',
                    name: name,
                    results: data.results,
                    pagination: pagination
                });
        });
    });

    /**
     * endpoint 2: /movies/{movie-id}
     */
    app.get('/movies/:id', function(req, res, next) {
        apiService.movieDetailsService(req.params.id, (err, data) => {
            if(err)
                return next(err);
            res.render('movie_details',
                {
                    title: data.originalTitle,
                    movie: data
                });
        });
    });

    /**
     * endpoint 3: /movies/{movie-id}/credits
     */
    app.get('/movies/:id/credits', function(req, res, next) {
        apiService.creditsService(req.params.id, (err, data) => {
            if(err)
                return next(err);
            res.render('credits',
                {
                    title: "Credits",
                    cast: data.cast
                });
        });
    });

    /**
     * endpoint 4: /actors/{actor-id}
     */
    app.get('/actors/:id', (req, res, next) => {
        apiService.actorService(req.params.id, (err, data) => {
            if(err)
                return next(err);
            res.render('actor',
                {
                    title: 'Actor Name',
                    cast: data.cast
                });
        });
    });
};