'use strict';

const request = require('request');

const exportHandler = {};

exportHandler.httpRequest = function(opt, cb) {
    request(opt)
        .on('response', resp => {
            let data = '';
            resp.on('error',
                err => cb(err));
            resp.on('data',
                d => data += d);
            resp.on('end',
                () => cb(null, data));
        });
};

module.exports = exportHandler;