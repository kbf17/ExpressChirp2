var shortid = require('shortid');


function newId (req, res, next){
    if (req.body.id){
        return req.body;
    }
    req.body.id = shortid.generate();
};

module.exports.newId = newId;