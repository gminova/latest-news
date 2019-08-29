const dbConnection = require('../db_connection');

const checkUsername = (username, cb) => {
    dbConnection.query(
        'SELECT username FROM users WHERE username ILIKE $1',
        [username],
        (err, res) => {
            if (err) return cb(err);
            cb(res);
        }
    );
};

const compareHashedPassword = (username, hashedPassword) => {
    return false;
}

module.exports = { checkUsername, compareHashedPassword }