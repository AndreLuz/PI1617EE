'use strict';

const MovieSearchItem = require('./MovieSearchItem.js');

module.exports = function item(val) {
    this.cast = [];
    val.cast.forEach(x => this.cast.push(new MovieSearchItem(x)));
};