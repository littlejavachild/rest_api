module.exports = {
    "_id" : { "type" : String },
    "title" : { "type" : String, required : true, minlength : 3 },
    "category" : { "type" : String, required : true, minlength : 3 },
    "price" : { "type" : Number, required : true, min : 0, max : 100000 },
    "quantity" : { "type" : Number, required : true, min : 0, max : 100000 },
    "status" : { "type" : Number, min : 0, max : 5, required : true }
};