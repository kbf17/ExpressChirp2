var moment = require('moment');

function timeStamp (chirp){
    if (chirp.time){
        return chirp;
    }
    chirp.time = moment();
};

module.exports.timeStamp = timeStamp;