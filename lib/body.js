"use strict";
/**
 * Helper module to read request body data
 * Ref: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
 * @param request
 */
const Q = require("q");
module.exports = function(request){
    let body = [];
    let deferred = Q.defer();
    request.on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        deferred.resolve( body );
    }).on("error",(err)=>{
        deferred.reject(err);
    });
    return deferred.promise;
};