const bcrypt = require('bcrypt');
const saltRounds = 10;
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
const SECRET = process.env.SECRET;

//generate hashed password
const hash = (password, cb) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) cb(err);
        cb(hash);
    });
};


//compare hashes
const compareHashes = (password, hash, cb) => {
    bcrypt.compare(password, hash, cb);
};

module.exports = { hash, compareHashes }