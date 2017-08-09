var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var pathJSON = path.join(__dirname, 'users.json');
var usersHandler = require('./user.proc');


router.route('/')
    .get(function(req, res){
        usersHandler.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });

    })

router.route('/:user')
    .get(function(req, res) {
        console.log('get single item');
        usersHandler.read(req.params.user)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);               
            })
    });
module.exports = router;