"use strict";
const pathToRegexp = require('path-to-regexp');
const methods = ["get","put","post","delete"]; // we'll only consider 4 routes for this assignment

/*
* Expose Router
 */
module.exports = Router;

//--------------------------------------------------------------------

function Router(){
    if(!(this instanceof Router)) return new Router();
    this.routes = {}; // handlers for HTTP routes;
}

//--------------------------------------------------------------------

Router.prototype.addRoute = function(method,route,handler){
    if( _canRoute(method,route,handler) ){
        // associate the method and route with the handler
        this.routes[method.toLowerCase()] = this.routes[method.toLowerCase()] || {};
        this.routes[method.toLowerCase()][route] = handler;
    }else{
        // fail silently.
        console.error(`could not add route. please make sure that the method, route, and handler function are properly supplied`);
    }
};

//--------------------------------------------------------------------

Router.prototype.getHandler = function(method,url){
    console.log( `method ${method} url ${url}` );
    let routes = Object.keys( this.routes[ method.toLowerCase() ] || {} );

    let handlers = [];
    routes.forEach((route)=>{
        // turn the user-defined path into a regex
        let re = pathToRegexp(route);
        // if the url matches the regex, return the associated handler
        if( re.test(url) ){
            console.log( `matches ${route}` );
            handlers.push( this.routes[ method.toLowerCase() ][ route ] );
        }
    });
    return handlers[0];
};

//--------------------------------------------------------------------

Router.prototype.toString = function(){ return JSON.stringify(this.routes) };

//--------------------------------------------------------------------
function _canRoute(method,route,handler){
    // must be a method we can handle
    if(methods.indexOf(method.toLowerCase()) == -1) return false;
    // must provide a path
    if(!route) return false;
    // must provide a callback function
    let isFunction = handler instanceof Function || typeof(handler) === "function";
    if(!handler || !isFunction) return false;

    return true;
}
//--------------------------------------------------------------------