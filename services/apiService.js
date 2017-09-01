'use strict';

const provider = require('../infoprovider.js');
const MovieSearch = require('../models/MovieSearch.js');
const MovieDetails = require('../models/MovieDetails.js');
const Credits = require('../models/Credits.js');
const ActorCredits = require('../models/ActorCredits.js');
const cacheController = require('../controllers/cacheController.js');

const exportHandler = {};
const API_KEY = 'c1369884d0ef11d7a69a7fb32a80b8e9';

function Options(uri, method, form, headers) {
    //this.protocol = 'https:'
    //this.hostname = 'api.themoviedb.org'
    //this.auth = "litherstarroonedimpuzzys"+ ":" + "627ae27bd68bf00cd412134fea9228d69b6c970f"
    this.uri = uri;
    this.method = method || 'GET';
    this.headers = headers || '';
    this.form = form || '';
}

exportHandler.searchService = function(name, page, cb) {
    const api_uri = 'https://api.themoviedb.org/3/search/movie?api_key='
        + API_KEY + '&query=' + name + '&page=' + page;
    provider.httpRequest(new Options(api_uri), (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        const pagination = checkPages(Number(page), data.total_pages);
        cb(null, new MovieSearch(data), pagination);
    })
};

function checkPages(page, total) {
    let pagination = {};
    if(page !== 1)
        pagination.first = 1;
    if(page !== total)
        pagination.last = total;
    if (page > 1)
        pagination.prev = page - 1;
    if (page < total)
        pagination.next = page + 1;
    return pagination
}

exportHandler.movieDetailsService = function(id, cb) {
    const api_uri = 'https://api.themoviedb.org/3/movie/' + id
        + '?api_key=' + API_KEY;
    const cached_name = 'movie' + id;
    let items = cacheController.Get(cached_name)
    if (items !== undefined)
        return cb(null, items);
    provider.httpRequest(new Options(api_uri), (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        items = new MovieDetails(data);
        cacheController.Put(cached_name, items);
        cb(null, items)
    })
};

exportHandler.creditsService = function(id, cb) {
    const api_uri = 'https://api.themoviedb.org/3/movie/' +
        id + '/credits' + '?api_key=' + API_KEY;
    const cached_name = 'moviecredits' + id;
    let items = cacheController.Get(cached_name);
    if (items !== undefined)
        return cb(null, items);
    provider.httpRequest(new Options(api_uri), (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        let items = new Credits(data);
        cacheController.Put(cached_name, items);
        cb(null, items);
    })
};

exportHandler.actorService = function(id, cb) {
    const api_uri = 'https://api.themoviedb.org/3/person/' +
        id + '/movie_credits?api_key='+ API_KEY;
    const cached_name = 'personcredits' + id;
    let items = cacheController.Get(cached_name);
    if (items !== undefined)
        return cb(null, items);
    provider.httpRequest(new Options(api_uri), (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        let items = new ActorCredits(data);
        cacheController.Put(cached_name, items);
        cb(null, items);
    })
};

module.exports = exportHandler;