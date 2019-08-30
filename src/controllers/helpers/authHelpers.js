const bcrypt = require('bcrypt');
const saltRounds = 10;
const { findUsername, findHashedPassword } = require('../../model/queries/readQueries');

//generate hashed password
const hash = (password, cb) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) cb(err);
        cb(hash);
    });
};


//compare hashes
const compareHashes = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        if (err) cb(err);
        cb(res);
    });
};

const checkUser = 0;
//check user
// async function checkUser(username, password) {
// 	try {
// 		const match = await axios.get(`/users/userId=${users[0]}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
module.exports = { hash, compareHashes, checkUser }