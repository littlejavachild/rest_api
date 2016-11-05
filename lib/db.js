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

        productSchema = mongoose.Schema( require("../schema/product") );
        Product = mongoose.model("Product",productSchema);

    }).catch((err)=>{
        console.error( err );
        process.exit(1);
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

Database.prototype.get = function(id){
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

Database.prototype.search = function(options){
    let deferred = Q.defer();

    // make a copy
    let query =  Object.assign({},options);

    // get the values
    let perPage = query.perPage || 10;
    let page = query.page || 0;
    let sort = query.sort || "title";
    let order = query.order || 1;

    // delete them from the query object
    delete query.perPage;
    delete query.page;
    delete query.sort;
    delete query.order;

    Product
        .find(query)
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sort] : order
        })
        .exec(function(err,results){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(results);
            }
        });

    return deferred.promise;
};

//--------------------------------------------------------------------

Database.prototype.update = function(id,update){
    let deferred = Q.defer();

    Product.update({ _id : id },{ $set : update },function(err,product){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(product);
        }
    });

    return deferred.promise;
}

//--------------------------------------------------------------------