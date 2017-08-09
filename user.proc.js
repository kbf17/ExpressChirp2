var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'users.json');



function getUsers() {
    console.log('in my promise');
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            resolve(JSON.parse(file));
        });
    });
}



function getUser(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                found;

            parsed.forEach(function(element) {
                if (element.id === id) {
                    found = element;
                }
            });

            if (!!found) {
                resolve(found);
            } else {
                reject('Not Found');
            }
        });
    });
}



module.exports = {
    all: getUsers,
    read: getUser,
};
