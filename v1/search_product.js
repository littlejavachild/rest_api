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

            // refer: https://nodejs.org/api/http.html#http_message_url
            // refer: https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
            let parsed = url.parse(request.url,true);

            // remember to parse the strings to numbers
            

            yield db.search(parsed.query);
            response.end();
        }
    }).catch((e)=>{
        console.error( e );
        _404(request,response);
    });
};

//--------------------------------------------------------------------



//--------------------------------------------------------------------