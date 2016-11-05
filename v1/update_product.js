"use strict";
const co = require("co");
const url = require("url");
const auth = require("../lib/auth");
const body = require("../lib/body");
const Q = require("q");

//--------------------------------------------------------------------

module.exports = function(request,response,db){
    return co(function*(){
        let id = request.url.split("/").pop();
        let bearer = request.headers["authorization"].split(" ").pop();

        if( !(yield auth.isValidToken(bearer)) ){
            let _403 = require("./_403");
            _403(request,response,db);
        }else{
            let updatedProduct;
            let payload = yield body(request);
            updatedProduct = yield* update(id,payload,db);

            response.writeHead(200,{
                "Content-Type" : "application/json"
            });

            response.end(JSON.stringify({
                success : true,
                code: 200,
                result : updatedProduct
            }));
        }
    }).catch((e)=>{
        let _400 = require("./_400");
        _400(request,response,db);
    });
};

//--------------------------------------------------------------------

function* update(id,payload,db){
    let update;
    let updatedProduct;

    update = JSON.parse(payload);
    updatedProduct = yield db.update(id,update);
    return updatedProduct;

}

//--------------------------------------------------------------------