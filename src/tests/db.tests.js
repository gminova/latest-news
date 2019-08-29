require("dotenv").config();

const test = require('tape');
const runDbBuild = require('../model/db_build');
const dbConnection = require("../model/db_connection");

test('Check that we\'re ready for testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});