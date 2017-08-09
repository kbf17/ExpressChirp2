var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var api = require('./api');
var clientPath = path.join(__dirname, 'client');

var app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Hello Server!");
});

app.use('/api', api);

app.listen(3000);
console.log('listening');