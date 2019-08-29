const test = require('tape');
const runDbBuild = require('../model/db_build');
const { checkUsername, compareHashedPassword } = require('../model/queries/findQueries');

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
    checkUsername(expected, (res) => {
        const actual = res.rows[0].username;
        t.equals(expected, actual, 'Username is already registered');
        t.end();
    });
});