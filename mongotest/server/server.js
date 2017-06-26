"use strict";
exports.__esModule = true;
var express = require("express");
var mongodb_1 = require("mongodb");
var path = require("path");
var server = express();
mongodb_1.MongoClient.connect('mongodb://admin:Melbourne1@ds147480.mlab.com:47480/chat', function (err, database) {
    if (err)
        console.log(err);
    server.use(express.static('dist'));
    server.get('/', function (req, res) {
        res.sendFile(path.resolve('index.html'));
    });
    server.listen(9005, function () {
        console.log('Example app listening on port 3000!');
    });
});
