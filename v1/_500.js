"use strict";
const co = require("co");
module.exports = function(request,response,db){
    return co(function*(){
        response.writeHead(500,{
            "Content-Type" : "application/json"
        });

        response.end(JSON.stringify({
            success : false,
            code: 500,
            error : `Internal server error`
        }));
    });
};