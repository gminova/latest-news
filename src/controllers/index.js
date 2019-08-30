const express = require('express');
const router = express.Router();

//import authentication helpers
const { createHash, compareHashes, createCookie, verifyCookie } = require('./helpers/authHelpers');

//import database helpers
const { createUser } = require('../model/queries/createQueries');
const { deleteUser } = require('../model/queries/deleteQueries');
const { findUsername, findHashedPassword } = require('../model/queries/readQueries');
const { updateUsername, updatePassword } = require('../model/queries/updateQueries');

//import home route controller
const home = require('./home');
const news = require('./news');
const error = require('./error');

//get home route
router.get('/', home.get);
//register route
router.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    findUsername(username, (res) => {
        if (!res === []) {
            new Error('Username is taken');
        } else {
            createHash(password, (hash) => {
                //register user in database
                createUser(username, hash);
                //generate cookie
                const cookie = createCookie(username);
                const week = 1000 * 60 * 60 * 24 * 7;
                res.cookie("latest-news", cookie, { maxAge: week * 1, httpOnly: true });
                res.render("main");
            });
        }
    });
});

router.get('/news', news.get);

//test 500 route in test mode only
if (process.env.NODE_ENV === "test") {
    const test = require('./test');
    router.get('/test', test.get);
}


router.use(error.client);
router.use(error.server);

module.exports = router;