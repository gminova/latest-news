const test = require('tape');
const { hash, compareHashes } = require('../controllers/helpers/authHelpers');

test('Check that we\'re ready for authentication testing', t => {
    t.assert(true, true, 'Must return true');
    t.assert(process.env.NODE_ENV, 'test', 'Must be in testing environment');
    t.end();
});

test('Check password and hash match', t => {
    const password = 'superSecret123^';
    const hash = '$2b$10$JbtV/0BSh49Y34z74H9K4.gyeK3ByfCACDUhuToulKRMYUYbrHrjq';
    compareHashes(password, hash, (res) => {
        t.equals(res, true, 'Password is genuine');
        t.end();
    });
});

test('Check a password is hashed correctly', t => {
    const password = 'superSecret123^';
    hash(password, (hash) => {
        compareHashes(password, hash, (res) => {
            t.equals(res, true, 'Password is hashed correctly');
            t.end();
        });
    });
});
