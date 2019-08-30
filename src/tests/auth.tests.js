const test = require('tape');
require('dotenv').config();
const SECRET = process.env.SECRET;
const { createHash, compareHashes, createCookie, verifyCookie } = require('../controllers/helpers/authHelpers');

test('Check that we\'re ready for authentication testing', t => {
    t.equals(true, true, 'Must return true');
    t.equals(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test('Check password and hash match', t => {
    const password = 'superSecret123^';
    const hash = '$2b$10$JbtV/0BSh49Y34z74H9K4.gyeK3ByfCACDUhuToulKRMYUYbrHrjq';
    compareHashes(password, hash, (err, res) => {
        t.equals(res, true, 'Password is genuine');
        t.end();
    });
});

test('Check a password is hashed correctly', t => {
    const password = 'superSecret123^';
    createHash(password, (hash) => {
        compareHashes(password, hash, (err, res) => {
            t.equals(res, true, 'Password is hashed correctly');
            t.end();
        });
    });
});


test('Cookie is generated successfully', t => {
    const username = 'mary';
    const expected = 'eyJhbGciOiJIUzI1NiJ9.bWFyeQ.eT3k0ExsBBYod-K8nRoDlrlro9RKy6GiieP4duikiu8';
    const cookie = createCookie(username);
    t.equals(cookie, expected, 'Cookie is generated successfully');
    t.end();
});

test('Cookie is valid', t => {
    const cookie = 'eyJhbGciOiJIUzI1NiJ9.bWFyeQ.eT3k0ExsBBYod-K8nRoDlrlro9RKy6GiieP4duikiu8';
    const match = verifyCookie(cookie, SECRET);
    t.equals(match, 'mary', 'Cookie is valid');
    t.end();
});