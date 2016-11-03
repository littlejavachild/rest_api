"use strict";
const co = require("co");
module.exports = function(request,response,db){

    return co(function*(){
        response.writeHead(403,{
            "Content-Type" : "application/json"
        });

        response.end(JSON.stringify({
            success : false,
            code: 403,
            error : `[${request.method}] ${request.url} unauthorized. please supply a valid token.`
        }));
    });
};