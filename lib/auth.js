"use strict";
const Q = require("q");
// some dummy tokens
const tokens = ["Ym9zY236Ym9zY28="];

exports.isValidToken = function(token){
    // this is likely to be a call to another microservice.
    // simulate using a promise.
    return Q( tokens.indexOf( token ) != -1 );
};