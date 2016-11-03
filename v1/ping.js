"use strict";
const co = require("co");
module.exports = function(request,response,db){
    return co(function*(){
        response.writeHead(200,{
            "Content-Type" : "application/json"
        });

        response.end(JSON.stringify({
            success : true,
            code: 200,
            "message" : "pong"
        }));
    });
};