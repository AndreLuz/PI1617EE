/**
 * Created by Luz on 15/08/2017.
 */
var express = require('express');
var router = express.Router();
var apiService = require('../services/apiService')

//const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'
const API_KEY = 'c1369884d0ef11d7a69a7fb32a80b8e9';

// https://api.themoviedb.org/3/search/movie
// ?api_key=c1369884d0ef11d7a69a7fb32a80b8e9
// &query=dark%20knight&page=1

/**
 * first endpoint: /search/{movie}
 */
router.get('/search', function(req, res, next) {
    const q = req.query.q;
    var api_url = 'https://api.themoviedb.org/3/search/movie?api_key='
        + API_KEY + "&query=" + q;
    apiService.searchService(api_url, (items) => {
        res.render('index', { title: 'Express' });
    });
});

module.exports = router;