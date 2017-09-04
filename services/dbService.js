'use strict';

const provider = require('../infoProvider.js');
const MovieSearchItem = require('../models/MovieSearchItem.js');

const exportHandler = {};

const auth = "luz" + ":" + "CLOUDANTismyfriend";

function Options(uri, method, headers) {
    this.baseUrl = 'https://luz.cloudant.com';
    this.uri = uri;
    this.method = method;
    this.headers = headers ? headers.Authorization = auth : { Authorization: auth};
}

exportHandler.getUser = function(username, cb) {
    const opt = new Options('/movie_users/' + username, 'GET');
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err);
        data = JSON.parse(data);
        if(data.error) //user doesn't exist
            return cb(null, null);
        cb(null, data);
    })
};

exportHandler.insertUser = function(username, password, cb) {
    const opt = new Options('/movie_users', 'POST');
    opt.json = {
        '_id': username,
        'username': username,
        'password': password,
        'favourites': []
    };
    provider.httpRequest(opt, (err, data) => {
        if (err)
            return cb(err);
        data = JSON.parse(data);
        if(data.error)
            return cb(new Error(data.error));
        cb(null, { username: data.id });
    });
};

exportHandler.userAuthentication = function (username, password, cb) {
    exportHandler.getUser(username, (err, user) => {
        if (err)
            return cb(err);
        if (!user)
            return cb(null, false, { message: 'Invalid User'});
        if (password !== user.password) {
            return cb(null, false, { message: 'Incorrect Password'});
        }
        cb(null, { username: user.username, password: user.password });
    })
};

exportHandler.addFavourite = function(user, movie, cb) {
    const opt = new Options('/movie_users/' + user.username, 'PUT', {'Content-Type': 'application/json'});
    user.favourites.push(new MovieSearchItem({
        title: movie.originalTitle,
        id: movie.id,
        release_date: movie.releaseDate,
        vote_average: movie.voteAverage
    }));
    opt.json = {
        '_id': user._id,
        '_rev': user._rev,
        'username': user.username,
        'password': user.password,
        'favourites': user.favourites
    };
    provider.httpRequest(opt, (err, data) => {
        if (err)
            return cb(err);
        data = JSON.parse(data);
        if(data.error)
            return cb(new Error(data.error));
        cb(null, { username: data.id });
    });
};

exportHandler.removeFavourite = function(user, movie_id, cb) {
    const opt = new Options('/movie_users/' + user.username, 'PUT', {'Content-Type': 'application/json'});
    user.favourites.forEach((val, i, array) => {
        if(val.id === movie_id)
            array.splice(i, 1)
    });
    opt.json = {
        '_id': user._id,
        '_rev': user._rev,
        'username': user.username,
        'password': user.password,
        'favourites': user.favourites
    };
    provider.httpRequest(opt, (err, data) => {
        if (err)
            return cb(err);
        data = JSON.parse(data);
        if(data.error)
            return cb(new Error(data.error));
        cb(null, { username: data.id });
    });
};

module.exports = exportHandler;