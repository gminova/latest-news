const dbConnection = require('../db_connection');

const createUser = (username, hashedPassword, cb) => {
    dbConnection.query(
        'INSERT INTO users (username, password_hash) VALUES($1, $2)',
        [username, hashedPassword],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );

}

module.exports = { createUser }