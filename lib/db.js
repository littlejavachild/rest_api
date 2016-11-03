"use strict";

const mongoose = require("mongoose");
const co = require("co");
const Q = require("q");

let productSchema;
let Product;

module.exports = Database;

//--------------------------------------------------------------------

function Database(url){
    if(!this instanceof Database) return new Database(url);
    this.url = process.env.MONGODB_URI || url || "mongodb://localhost/shop";
}

//--------------------------------------------------------------------

Database.prototype.connect = function(){
    let url = this.url;
    return co(function*(){
        yield mongoose.connect( url );
        let db = mongoose.connection;

        productSchema = mongoose.Schema( require("../schema/product") );
        Product = mongoose.model("Product",productSchema);

        db.once("open",()=>{
           console.log( "connected to database" )
        });

        db.on("error",()=>{
           console.error( "error connecting to database" )
        });

    }).catch((err)=>{
        console.error( err );
    });
};

//--------------------------------------------------------------------

Database.prototype.save = function(product){
    let p = new Product(product);
    let deferred = Q.defer();
    p.save(function(err,savedProduct){
        if( savedProduct === {} ){
            err = new Error();
            err.message = "payload contains field(s) not defined in the schema"
            err.code = 400;
            deferred.reject(err)
        }else if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(savedProduct);
        }
    });
    return deferred.promise;
};

//--------------------------------------------------------------------

Database.prototype.find = function(id){
    let deferred = Q.defer();
    Product.findOne({_id:id},function(err,product){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(product);
        }
    });
    return deferred.promise;
};

//--------------------------------------------------------------------

Database.prototype.remove = function(id){
    let deferred = Q.defer();
    Product.find({_id:id}).remove(function(err,result){
       if(err){
           console.error(err);
           deferred.reject(err);
       }else{
           deferred.resolve(result);
       }
    });
    return deferred.promise;
};

//--------------------------------------------------------------------