const { Pool } = require('pg');
require('dotenv').config();

let dbLink =
    process.env.NODE_ENV === 'test' ?
        process.env.TEST_DATABASE_URL :
        process.env.DATABASE_URL;

if (!dbLink) throw new Error('Invalid or missing database URL');

module.exports = new Pool({
    dbLink,
    ssl: !dbLink.includes('localhost')
})