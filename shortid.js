var shortid = require('shortid');
var express = require('express');


function newId (req, res, next){
    if (req.body.id){
        return;
    }
    req.body.id = shortid.generate();

    next();
};

module.exports = newId;