'use strict';

const cacheController = {};

var map = new Map();

cacheController.Get = function(path) {
    if(map.has(path)){
        console.log("//From Cache " + path);
        return map.get(path)
    }
};

cacheController.Put = function(path, val) {
    console.log("//Written in cache " + path);
    map.set(path, val)
};

module.exports = cacheController;