const dbConnection = require('../db_connection');

const deleteUser = (username, hashedPassword, cb) => {
    dbConnection.query(
        'DELETE FROM users WHERE username LIKE $1 AND password_hash LIKE $2',
        [username, hashedPassword],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );
}

module.exports = { deleteUser }