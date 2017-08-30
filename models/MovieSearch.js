'use strict';

const SearchItem = require('./MovieSearchItem.js');

module.exports = function item(val) {
    this.results = [];
    val.results.forEach(x => this.results.push(new SearchItem(x)));
};