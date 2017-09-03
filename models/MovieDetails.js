'use strict'

module.exports = function item(val) {
    this.tagline = val.tagline;
    this.id = val.id;
    this.originalTitle = val.original_title;
    this.overview = val.overview;
    this.releaseDate = val.release_date;
    this.voteAverage = val.vote_average

    this.toString = JSON.stringify(this);
};