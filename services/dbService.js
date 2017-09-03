'use strict';

const provider = require('../infoprovider.js');

const exportHandler = {};

function Options(uri, method, form, headers) {
    //this.host = 'localhost';
    //this.auth = "litherstarroonedimpuzzys"+ ":" + "627ae27bd68bf00cd412134fea9228d69b6c970f"
    this.baseUrl = 'http://localhost:5984';
    //this.port = 5984;
    this.uri = uri;
    this.method = method;
    this.headers = headers || '';
    this.form = form || '';
}

exportHandler.getUser = function(username, cb) {
    const opt = new Options('/users/' + username, 'GET');
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
    const opt = new Options('/users/', 'POST', {'Content-Type': 'application/json'});
    provider.httpRequest(opt, (err, data) => {
            if (err)
                return cb(err);
            if(data.error)
                return cb(new Error(data.error));
            cb(null, data);
        }, JSON.stringify(
        {
            '_id': username,
            'username': username,
            'password': password,
            'favourites': []
        })
    )
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
        cb(null, {username: user.username, password: user.password});
    })
}

module.exports = exportHandler;