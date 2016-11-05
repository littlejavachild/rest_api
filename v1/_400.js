"use strict";
const co = require("co");
module.exports = function(request,response,db){

    return co(function*(){
        response.writeHead(400,{
            "Content-Type" : "application/json"
        });

        response.end(JSON.stringify({
            success : false,
            code: 400,
            error : `[${request.method}] ${request.url} bad request.`
        }));
    });
};