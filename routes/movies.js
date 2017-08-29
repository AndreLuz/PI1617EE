'use strict'

var express = require('express');
var router = express.Router();
var apiService = require('../services/apiService')

const API_KEY = 'c1369884d0ef11d7a69a7fb32a80b8e9';

//const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'

// https://api.themoviedb.org/3/search/movie
// ?api_key=c1369884d0ef11d7a69a7fb32a80b8e9
// &query=dark%20knight&page=1

/**
 * first endpoint: /movies?name=...&page=...
 */
router.get('', function(req, res, next) {
    const name = req.query.name;
    const api_url = 'https://api.themoviedb.org/3/search/movie?api_key='
        + API_KEY + "&query=" + name;
    apiService.searchService(api_url, (err, data) => {
        if(err)
            return  next(err)
        res.render('movies_list',
            {
                title: 'Search Results',
                results: data.results
            });
    });
});

/**
 * second endpoint: /movies/{movie-id}
 */
router.get('/:id', function(req, res, next) {
    const id = req.params.id
    const api_url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key='
        + API_KEY
    apiService.detailsService(api_url, (err, data) => {
        if(err)
            return  next(err)
        res.render('movie_details',
            {
                title: data.originalTitle,
                movie: data
            });
    });
})

module.exports = router;