module.exports = {
    "title" : { "type" : String, required : true },
    "category" : { "type" : String, required : true },
    "price" : { "type" : Number, required : true },
    "quantity" : { "type" : Number, required : true },
    "status" : { "type" : Number, min : 0, max : 5, required : true }
};