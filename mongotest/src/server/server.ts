import * as express from 'express';
import mongodb from 'mongodb';
import * as path from 'path';
var server = express();

server.use(express.static('dist'));

server.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
})

server.listen(9005, function () {
    console.log('Example app listening on port 3000!')
})