var express = require('express');
var path = require('path');
var chirps = require('./chirps.ctrl');

var router = express.Router();

router.use('/chirps', chirps);

module.exports = router;