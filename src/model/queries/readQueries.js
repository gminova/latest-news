const dbConnection = require('../db_connection');

const findUsername = (username, cb) => {
    if (!typeof username === 'string') {
        throw Error('Username must be string');
    } else {
        dbConnection.query(
            'SELECT username FROM users WHERE username LIKE $1',
            [username],
            (err, res) => {
                if (err) throw Error('Unable to find username');
                return cb(res.rows);
            }
        );
    }
};

const findHashedPassword = (username, cb) => {
    if (!typeof username === 'string') {
        throw Error('Username must be string');
    } else {
        dbConnection.query(
            'SELECT password_hash FROM users WHERE username LIKE $1',
            [username],
            (err, res) => {
                if (err) throw Error('Unable to find username');
                return cb(res.rows);
            }
        )
    }
};

module.exports = { findUsername, findHashedPassword }