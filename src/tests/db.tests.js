const test = require('tape');
const runDbBuild = require('../model/db_build');
const { findUsername, findHashedPassword } = require('../model/queries/readQueries');
const { createUser } = require('../model/queries/createQueries');
const { deleteUser } = require('../model/queries/deleteQueries');
const { updateUsername, updatePassword } = require('../model/queries/updateQueries');

test('Check that we\'re ready for database testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test("Check test database build is successful", t => {
    runDbBuild
        .then(() => {
            t.pass("Database build passing");
            t.end();
        })
        .catch(err => {
            t.error(err, "Database build failed");
            t.end();
        });
});

test('Check username is already registered', t => {
    const expected = 'vanessa';
    findUsername(expected, (res) => {
        const actual = res.rows[0].username;
        t.equals(expected, actual, 'Username is already registered');
        t.end();
    });
});

test('Check username hasn\'t been registered', t => {
    const expected = 'martin';
    findUsername(expected, (res) => {
        const actual = res.rows.length;
        t.equals(actual, 0, 'Username hasn\'t been registered');
        t.end();
    });
});

test('Check username\'s hash is retrieved', t => {
    const username = 'vanessa';
    findHashedPassword(username, (res) => {
        const actual = res.rows[0].password_hash;
        t.equals(actual, '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa', 'Username\'s hash is retrieved');
        t.end();
    });
});

test('Check new user has been created', t => {
    const username = 'sarah';
    const hashedPassword = '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa';
    createUser(username, hashedPassword, (res) => {
        const actual = res.rowCount;
        t.equals(actual, 1, 'New user has been created');
        t.end();
    });
});

test('Check username has been updated', t => {
    const newUsername = 'martina';
    const oldUsername = 'sarah';
    const hashedPassword = 'ssssssssssssssss';
    updateUsername(newUsername, oldUsername, hashedPassword, (res) => {
        const actual = res.rowCount;
        t.equals(actual, 1, 'Username has been updated');
        t.end();
    });
});

test('Check password has been updated', t => {
    const newPasswordHash = 'mmmmmmmmmmmmmmmm';
    const oldPasswordHash = 'ssssssssssssssss';
    const username = 'martina';
    updatePassword(newPasswordHash, oldPasswordHash, username, (res) => {
        const actual = res.rowCount;
        t.equals(actual, 1, 'Password has been updated');
        t.end();
    });
});

test('Check user has been deleted', t => {
    const username = 'martina';
    const hashedPassword = 'mmmmmmmmmmmmmmmm';
    deleteUser(username, hashedPassword, (res) => {
        const actual = res.rowCount;
        t.equals(actual, 1, 'User has been deleted');
        t.end();
    });
});