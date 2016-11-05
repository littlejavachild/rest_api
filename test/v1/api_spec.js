"usr strict";
const frisby = require("frisby");
const url = require("url");

const _id = "dummy_product";
const BASE = process.env.BASE || "http://localhost:8080";
const ENDPOINT = `v1/product/`;
const API_URL = url.resolve(BASE,ENDPOINT);

//------------------------------------------------------------------------------

// Missing title
frisby.create("insert product with missing title")
.post(API_URL,{
    "_id" : _id,
    "category" : "dummy",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Missing category
frisby.create("insert product with missing category")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Missing price
frisby.create("insert product with missing price")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "dummy",
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Missing quantity
frisby.create("insert product with missing quantity")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "price" : 100,
    "category" : "dummy",
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Missing status
frisby.create("insert product with missing status")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "dummy",
    "price" : 100,
    "quantity" : 10
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Empty title
frisby.create("insert product with empty title")
.post(API_URL,{
    "_id" : _id,
    "title" : "",
    "category" : "dummy",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Small title
frisby.create("insert product with title less than 3 characters")
.post(API_URL,{
    "_id" : _id,
    "title" : "hi",
    "category" : "dummy",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Small category
frisby.create("insert product with category less than 3 characters")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "du",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Negative pricing
frisby.create("insert product with category less than 3 characters")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "dummy",
    "price" : -100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Very high pricing
frisby.create("insert product with category less than 3 characters")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "dummy",
    "price" : 9999999999999999999,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(400)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":false,"code":400,"error":"[POST] /v1/product/ bad request."})
.toss();

//------------------------------------------------------------------------------

// Insert a product properly
frisby.create("insert product")
.post(API_URL,{
    "_id" : _id,
    "title" : "Dummy Product",
    "category" : "dummy",
    "price" : 100,
    "quantity" : 100,
    "status" : 1
},{json:true})
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(201)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({
    "success":true,
    "code":201,
    "result" : {
        _id : _id,
        "title" : "Dummy Product",
        "category" : "dummy",
        "price" : 100,
        "quantity" : 100,
        "status" : 1
    }
})
.toss();

//------------------------------------------------------------------------------