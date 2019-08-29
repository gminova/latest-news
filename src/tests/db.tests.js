const test = require('tape');
const runDbBuild = require('../model/db_build');
const { checkUsername } = require('../model/queries/findQueries');

test('Check that we\'re ready for database testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test('Chesk is username already exists', t => {
    runDbBuild((err, res) => {
        t.error(err, null, "No error");
        checkUsername()
            .then(res => {
                t.equals(Arrays.isArray(res.rows), true);
                t.end();
            });
    });
});