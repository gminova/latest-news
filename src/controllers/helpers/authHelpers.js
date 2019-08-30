const bcrypt = require('bcrypt');
const saltRounds = 10;

//generate hashed password
const hash = (password, cb) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) cb(err);
        cb(hash);
    });
};


//compare hashes
const compareHashes = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        if (err) cb(err);
        cb(res);
    });
};

module.exports = { hash, compareHashes }