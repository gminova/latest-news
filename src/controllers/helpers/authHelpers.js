const bcrypt = require('bcrypt');
const saltRounds = 10;
const { findUsername, findHashedPassword } = require('../../model/queries/readQueries');

//generate hashed password
const hash = (password, cb) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) cb(err);
        cb(hash);
    });
}


//compare hashes
const compareHashes = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        if (err) cb(err);
        cb(res);
    });
}

//check user
async function checkUser(username, password) {
    findHashedPassword(username, (res) => {
        if (res.rows.length === 0) {
            throw new Error('Unable to find this user');
        } else {
            const match = await bcrypt.compare(password, res.rows[0].password_hash);
            if (match) {
                console.log('Successful log in');
            }
            console.log('Log in failed, please try again');
        }
    });
}

module.exports = { hash, compareHashes }