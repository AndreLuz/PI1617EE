'use strict';

var apiService = require('../services/apiService');

const API_KEY = 'c1369884d0ef11d7a69a7fb32a80b8e9';

module.exports = function actorsCtrl(app) {

    /**
     * homepage endpoint: /
     */
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Movie Search' });
    });

    /**
     * endpoint 1: /movies?name=...&page=...
     */
    app.get('/movies', function(req, res, next) {
        const name = req.query.name;
        var page = '1';
        if (Object.prototype.hasOwnProperty.call(req.query, 'page')) {
            page = req.query.page
        }
        const api_url = 'https://api.themoviedb.org/3/search/movie?api_key='
            + API_KEY + '&query=' + name + '&page=' + page;
        apiService.searchService(api_url, page, (err, data, pagination) => {
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
        const id = req.params.id;
        const api_url = 'https://api.themoviedb.org/3/movie/' + id
            + '?api_key=' + API_KEY;
        apiService.movieDetailsService(api_url, (err, data) => {
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
        const id = req.params.id;
        const api_url = 'https://api.themoviedb.org/3/movie/' +
            id + '/credits' + '?api_key=' + API_KEY;
        apiService.creditsService(api_url, (err, data) => {
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
        const id = req.params.id;
        const api_url = 'https://api.themoviedb.org/3/person/' +
            id + '/movie_credits?api_key='+ API_KEY;
        apiService.actorService(api_url, (err, data) => {
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