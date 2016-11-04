"use strict";
const http = require("http");
const port = process.env.PORT || 8080;
const Router = require("./lib/router");
const version = process.env.VERSION || "v1";
const router = new Router();
const co = require("co");

const Database = require("./lib/db");
const _404 = require(`./${version}/_404`);
const _500 = require(`./${version}/_500`);

router.addRoute("get",`/${version}/ping`,require(`./${version}/ping`));
router.addRoute("get",`/${version}/product/:id`,require(`./${version}/get_product`));
router.addRoute("post",`/${version}/product/`,require(`./${version}/add_product`));
router.addRoute("delete",`/${version}/product/:id`,require(`./${version}/remove_product`));
router.addRoute("get",`/${version}/search(\\?+)(.*)`,require(`./${version}/search_product`));

let db = new Database();

const server = http.createServer((request,response)=>{
    co(function*(){
        let handler = router.getHandler( request.method,request.url ) || _404;
        yield handler(request,response,db);
    }).catch((err)=>{
        // console.error( err );
        _500(request,response);
    })
});


db.connect().then(
    ()=> {
        server.listen(port,()=>{
            console.log(`magic happens on port ${port}`);
        });
    }
);