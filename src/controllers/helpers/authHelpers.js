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

//create cookie/JWT
const cookie = (username) => sign(username, SECRET);

const verifyCookie = (cookie, SECRET, cb) => cookie.verify(cookie, SECRET, (err, cookie) => {
    if (err) {
        throw Error('Invalid cookie');
    } else {
        return cookie;
    }
);

module.exports = { hash, compareHashes }