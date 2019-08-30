const dbConnection = require('../db_connection');

const updateUsername = (newUsername, oldUsername, hashedPassword, cb) => {
    dbConnection.query(
        'UPDATE users SET username = $1 WHERE username ILIKE $2 AND password_hash = $3',
        [newUsername, oldUsername, hashedPassword],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );
}

const updatePassword = (newPasswordHash, oldPasswordHash, username, cb) => {
    dbConnection.query(
        'UPDATE users SET password_hash = $1 WHERE password_hash = $2 AND username ILIKE $3',
        [newPasswordHash, oldPasswordHash, username],
        (err, res) => {
            if (err) return cb(err);
            return cb(res);
        }
    );
}

module.exports = { updateUsername, updatePassword }