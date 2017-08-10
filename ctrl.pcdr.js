var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'data.json');
var userPathJSON = path.join(__dirname, 'users.json');


function insertChirp(chirp) {
    return new Promise(function(resolve, reject) {
        console.log('in my promise');
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }
            var parsed = JSON.parse(file);

            parsed.push(chirp);

            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    reject('Error writing to data.json');
                }

                resolve('Created');
            });
        });
    });
}

function getChirps() {
    console.log('in my promise');
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }
            var chirps = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
            var users = JSON.parse(fs.readFileSync(userPathJSON, 'utf-8'));

            var userMap = {};

            users.forEach(function(user){
                userMap[(user.id)] = user.username;
            });
            chirps.forEach(function(chirp){
                chirp.user = userMap[chirp.userid.toString()];
            });

            resolve(chirps);
        });
    });
}

function updateChirp(chirp) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                isFound = false;

            parsed.forEach(function(element) {
                if (element.id === chirp.id) {
                    isFound = true;
                    element.user = chirp.user;
                    element.message = chirp.message;
                }
            });

            if (isFound) {
                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to data.json');
                    }

                    resolve('Updated');
                })
            }
        });
    });
}

function getChirp(id) {
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

function deleteChirp(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                isDeleted = false,
                deleteIndex;

            parsed.forEach(function(element, i) {
                if (element.id === id) {
                    isDeleted = true;
                    deleteIndex = i;
                }
            });

            if (isDeleted) {
                parsed.splice(deleteIndex, 1);

                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to data.json');
                    }

                    resolve('Deleted');
                });
            } else {
                reject('Not Found');
            }
        });
    });
}
function getUser(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }
            console.log('one user promise');
            var parsed = JSON.parse(file),
                usersChirps = parsed.filter(function(chirp){
                if(chirp.userid == id){
                    return true;
                } else {
                    return false;
                }
            });
            if (true){
               resolve(usersChirps);
            } else{
                reject('Not Found');
            }
        });
    });
}

module.exports = {
    create: insertChirp,
    all: getChirps,
    read: getChirp,
    destroy: deleteChirp,
    update: updateChirp,
    user: getUser
};