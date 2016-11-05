"usr strict";
const frisby = require("frisby");
const url = require("url");

const BASE = process.env.BASE || "http://localhost:8080";
const ENDPOINT = "v1/ping";
const API_URL = url.resolve(BASE,ENDPOINT);


frisby.create("check connectivity")
.get(API_URL)
.addHeader("Authorization","Bearer Ym9zY236Ym9zY28=")
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({"success":true,"code":200,"message":"pong"})
.toss();