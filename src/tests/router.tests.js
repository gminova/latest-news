const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

test('Check that we\'re ready for router testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
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

test('Check 500 route renders correctly', t => {
    supertest(app)
    .get('/test')
    .expect(500)
    .expect('Content-type', /html/)
    .end((err, res) => {
        t.equals(null, err, 'No error with 500 route');
        t.end();
    });
});