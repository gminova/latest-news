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
const news = require('./news');
const error = require('./error');

//get home route
router.get('/', (req, res) => {
    res.render('home', { activePage: { home: true } });
});
//register route
router.get("/register", (req, res) => {
    res.render("register");
});
//handle registration request
router.post('/register', (req, res, next) => {
    let { username, password } = req.body;
    findUsername(username, (dbRes) => {
        //if username exists in database, send back a message
        if (dbRes.length == 1) {
            const message = "Sorry, this username is already taken."
            res.render("register", { message, main: true });
        } else {
            createHash(password, (hash) => {
                //register user in database
                createUser(username, hash, (user) => {
                    //generate cookie
                    const cookie = createCookie(username);
                    const week = 1000 * 60 * 60 * 24 * 7;
                    res.cookie("latest-news", cookie, { maxAge: week * 1, httpOnly: true });
                    res.render("main");
                });
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