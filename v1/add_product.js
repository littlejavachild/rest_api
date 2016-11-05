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
            let savedProduct;
            let payload = yield body(request);
            savedProduct = yield* save(payload,db);

            response.writeHead(201,{
                "Content-Type" : "application/json"
            });

            response.end(JSON.stringify({
                success : true,
                code: 201,
                result : savedProduct
            }));
        }
    }).catch((e)=>{
        console.log( e );
        let _400 = require("./_400");
        _400(request,response,db);
    });
};

//--------------------------------------------------------------------

function* save(payload,db){
    let product;
    let savedProduct;

    product = JSON.parse(payload);
    savedProduct = yield db.save(product);
    return savedProduct;

}

//--------------------------------------------------------------------