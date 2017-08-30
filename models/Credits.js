'use strict';

const CastItem = require('./CastItem.js');

module.exports = function item(val) {
    this.cast = [];
    val.cast.forEach(x => this.cast.push(new CastItem(x)));

    //this.toString =
};