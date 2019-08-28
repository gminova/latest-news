const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

test('Check that we\'re ready for testing', t => {
    t.assert(true, true, 'Must return true');
    t.end();
});

