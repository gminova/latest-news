const bcrypt = require('bcrypt');
const saltRounds = 10;
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

//generate hashed password
const createHash = (password, cb) => {
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
const createCookie = (username) => {
    const cookie = sign(username, SECRET);
    return cookie;
};

const verifyCookie = (cookie, SECRET) => {
    const res = verify(cookie, SECRET);
    return res;
};

module.exports = { createHash, compareHashes, createCookie, verifyCookie }