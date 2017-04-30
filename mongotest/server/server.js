"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var server = express();
server.use(express.static('dist'));
server.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});
server.listen(9005, function () {
    console.log('Example app listening on port 3000!');
});
