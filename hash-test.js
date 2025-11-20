
// I did this to get the hash value for "smiths"
const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash('smiths', saltRounds, function(err, hash) {
    if (err) throw err;
    console.log(hash);
});

//here it is "$2b$10$84aoRqZYKbgxcmWdg9L9OeaK3ILr1ZV8BwGEQ01nWQHFGo.0KX7/W"
