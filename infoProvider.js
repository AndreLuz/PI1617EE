'use strict'

//const https = require('https')
const request = require('request');

const exportHandler = {};


exportHandler.httpRequest = function(opt, cb, info) {
    /*let req = request(opt, (resp) => {
        let data = ''
        resp.on('error', err => cb(err))
        resp.on('data', d => data += d)
        resp.on('end', () => cb(null, data) )
    })*/
    let req = request(opt)
        //.on('error', err => cb(err))
        //.on('data', d => cb(null, d))
        .on('response', resp => {
            let data = '';
            resp.on('error',
                err => cb(err));
            resp.on('data',
                d => data += d);
            resp.on('end',
                () => cb(null, data));
        });
        //.on('end', () => cb(null, data) )



    /*if(info !== undefined) {
        req.write(info)
        req.on('error', err => cb(err))
    }
    req.end()*/
};

module.exports = exportHandler;