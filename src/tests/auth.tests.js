const test = require('tape');
const { hash, compareHashes } = require('../controllers/helpers/authHelpers');

test('Check that we\'re ready for authentication testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test('Check a password is hashed correctly', t => {
    const password = 'superSecret123^';
    hash(password, (hash) => {
        console.log(hash)
        compareHashes(password, hash, (res) => {
            t.deepEquals(res, true, 'Password is hashed correctly');
            t.end();
        });
    });
});

// test('Check user credentials', t => {
//     checkUser
// })