var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var pathJSON = path.join(__dirname, 'data.json');
var chirpsHandler = require('./ctrl.pcdr');
var newId = require('./shortid');
var timeStamp = require('./moment');




router.route('/')
    .get(function(req, res){
        chirpsHandler.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });

    })

    .post(newId, timeStamp, function(req, res){
        console.log('We are posting');
        chirpsHandler.create(req.body)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);
            })
    })

    .put(function(req, res){
        console.log('Here\'s where we update');
        chirpsHandler.update(req.body)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);
            })
        
    })

router.route('/one/:id')
    .delete(function(req, res){
        console.log('Delete the things');
        chirpsHandler.destroy(req.params.id)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                console.log('chirp controller');
                res.sendStatus(500);               
            })
    })
    .get(function(req, res) {
        console.log('get single item');
        chirpsHandler.read(req.params.id)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);               
            })
    });
module.exports = router;