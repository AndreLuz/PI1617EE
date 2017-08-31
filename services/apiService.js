'use strict';

const provider = require('../infoprovider.js');
const MovieSearch = require('../models/MovieSearch.js');
const MovieDetails = require('../models/MovieDetails.js');
const Credits = require('../models/Credits.js');
const ActorCredits = require('../models/ActorCredits.js');

var exportHandler = {};

function Options(uri, method, form, headers) {
    //this.protocol = 'https:'
    //this.hostname = 'api.themoviedb.org'
    //this.auth = "litherstarroonedimpuzzys"+ ":" + "627ae27bd68bf00cd412134fea9228d69b6c970f"
    this.uri = uri;
    this.method = method || 'GET';
    this.headers = headers || '';
    this.form = form || '';
}

exportHandler.searchService = function(uri, page, cb) {
    let opt = new Options(uri);
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        const pagination = checkPages(Number(page), data.total_pages)
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

exportHandler.movieDetailsService = function(uri, cb) {
    let opt = new Options(uri);
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        let items = new MovieDetails(data);
        cb(null, items);
    })
};

exportHandler.creditsService = function(uri, cb) {
    let opt = new Options(uri);
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        let items = new Credits(data);
        cb(null, items);
    })
};

exportHandler.actorService = function(uri, cb) {
    let opt = new Options(uri);
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        let items = new ActorCredits(data);
        cb(null, items);
    })
};

module.exports = exportHandler;