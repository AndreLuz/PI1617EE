'use strict'

const provider = require('../infoprovider.js');

var exportHandler = {};

function Options(path, method, headers) {
    this.host = 'localhost'
    this.port = 3000
    //this.auth = "litherstarroonedimpuzzys"+ ":" + "627ae27bd68bf00cd412134fea9228d69b6c970f"
    this.path = path
    this.method = method
    this.headers = headers || ''
}

exportHandler.searchService = function() {

}

module.exports = exportHandler