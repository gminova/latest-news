const test = require('tape');
const runDbBuild = require("../src/model/database/db_build");

test('Check that we\'re ready for testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});