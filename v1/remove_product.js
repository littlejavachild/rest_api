"use strict";
const co = require("co");
const url = require("url");
const auth = require("../lib/auth");
const _404 = require("./_404");
//--------------------------------------------------------------------

module.exports = function(request,response,db){
    return co(function*(){
        let id = request.url.split("/").pop();
        let bearer = request.headers["authorization"].split(" ").pop();

        if( !(yield auth.isValidToken(bearer)) ){
            let _403 = require("./_403");
            _403(request,response);
        }else{
            let result = yield* remove(id,db);

            response.writeHead(200,{
                "Content-Type" : "application/json"
            });

            response.end(JSON.stringify({
                success : true,
                code: 200,
                result : result
            }));
        }
    }).catch((e)=>{
        console.error( e );
        _404(request,response);
    });
};

//--------------------------------------------------------------------

function* remove(id,db){
    return yield db.remove(id);
}

//--------------------------------------------------------------------