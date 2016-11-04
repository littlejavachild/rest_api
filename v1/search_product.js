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
        let numberRegex = /^\d+(\.\d{1,2})?$/;

        if( !(yield auth.isValidToken(bearer)) ){
            let _403 = require("./_403");
            _403(request,response);
        }else{

            // refer: https://nodejs.org/api/http.html#http_message_url
            // refer: https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
            let parsed = url.parse(request.url,true);

            // remember to parse the strings to numbers
            // remove them if the value cannot be parsed to number
            if( parsed.query.price  ){
                if(!numberRegex.test(parsed.query.price)){
                    delete parsed.query.price;
                }else{
                    parsed.query.price = parseFloat( parsed.query.price );
                }
            }

            if( parsed.query.quantity  ){
                if(!numberRegex.test(parsed.query.quantity)){
                    delete parsed.query.quantity;
                }else{
                    parsed.query.quantity = parseFloat( parsed.query.quantity );
                }
            }

            if( parsed.query.status  ){
                if(!numberRegex.test(parsed.query.status)){
                    delete parsed.query.status;
                }else{
                    parsed.query.status = parseFloat( parsed.query.status );
                }
            }

            if( parsed.query.perPage  ){
                if(!numberRegex.test(parsed.query.perPage)){
                    delete parsed.query.perPage;
                }else{
                    parsed.query.perPage = parseFloat( parsed.query.perPage );
                }
            }

            if( parsed.query.page  ){
                if(!numberRegex.test(parsed.query.page)){
                    delete parsed.query.page;
                }else{
                    parsed.query.page = parseFloat( parsed.query.page );
                }
            }

            let result = yield search(parsed.query,db);

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

function* search(options,db){
    return yield db.search(options);
}

//--------------------------------------------------------------------