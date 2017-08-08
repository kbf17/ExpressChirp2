var moment = require('moment');

function timeStamp (req, res, next){
    if (req.body.time){
        return req.body;
    }
    req.body.time = moment().format();
    next();
};

module.exports = timeStamp;