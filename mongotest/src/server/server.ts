import * as express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';
var server = express();
var db = mongoose.connect('mongodb://admin:Melbourne1@ds147480.mlab.com:47480/chat');
db.    
    server.use(express.static('dist'));

    server.get('/', function (req, res) {
        res.sendFile(path.resolve('index.html'));
    })

    server.listen(9005, function () {
        console.log('Example app listening on port 3000!')
    })

