const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

test('Check that we\'re ready for testing', t => {
    t.assert(true, true, 'Must return true');
    t.end();
});

test('Check home route renders correctly', t => {
    supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
        t.equals(null, err, 'No error with home route');
        t.end();
    });
});

test('Check 404 route renders correctly', t => {
    supertest(app)
    .get('/404')
    .expect(404)
    .expect('Content-type', /html/)
    .end((err, res) => {
        t.equals(null, err, 'No error with 404 route');
        t.end();
    });
});