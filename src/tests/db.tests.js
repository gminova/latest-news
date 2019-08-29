const test = require('tape');
const runDbBuild = require('../model/db_build');
const { findUsername, findHashedPassword } = require('../model/queries/readQueries');

test('Check that we\'re ready for database testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test("Check test database build is successful", t => {
    runDbBuild
        .then(res => {
            t.pass("Database build passing");
            t.end();
        })
        .catch(err => {
            t.error(err, "Database build failed");
            t.end();
        });
});

test('Check username is already registered', t => {
    const expected = 'Vanessa';
    findUsername(expected, (res) => {
        const actual = res.rows[0].username;
        t.equals(expected, actual, 'Username is already registered');
        t.end();
    });
});

test('Check username hasn\'t been registered', t => {
    const expected = 'Martin';
    findUsername(expected, (res) => {
        const actual = res.rows.length;
        t.equals(actual, 0, 'Username hasn\'t been registered');
        t.end();
    });
});

test('Check username\'s hash is retrieved', t => {
    const username = 'Vanessa';
    findHashedPassword(username, (res) => {
        const actual = res.rows[0].password_hash;
        t.equals(actual, 'ddddddddddddddddd', 'Username\'s hash is retrieved');
        t.end();
    });
});