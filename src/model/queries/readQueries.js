const dbConnection = require('../db_connection');

const findUsername = (username, cb) => {
    dbConnection.query(
        'SELECT username FROM users WHERE username ILIKE $1',
        [username],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );
};

const findHashedPassword = (username, cb) => {
    dbConnection.query(
        'SELECT password_hash FROM users WHERE username ILIKE $1',
        [username],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );
}

module.exports = { findUsername, findHashedPassword }