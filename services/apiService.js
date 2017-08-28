'use strict'

const provider = require('../infoprovider.js');
const movieSearch = require('../models/MovieSearch.js')

var exportHandler = {};

function Options(uri, method, form, headers) {
    //this.protocol = 'https:'
    //this.hostname = 'api.themoviedb.org'
    //this.auth = "litherstarroonedimpuzzys"+ ":" + "627ae27bd68bf00cd412134fea9228d69b6c970f"
    this.uri = uri
    this.method = method || 'GET'
    this.headers = headers || ''
    this.form = form || ''
}

exportHandler.searchService = function(uri, cb) {
    let opt = new Options(uri)
    provider.httpRequest(opt, (err, data) => {
        if(err)
            return cb(err)
        data = JSON.parse(data)
        let items = new movieSearch(data)
        cb(null, items)
    })
}

module.exports = exportHandler