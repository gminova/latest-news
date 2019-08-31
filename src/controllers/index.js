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
    if (!req.headers.cookie) {
        res.render('home', { activePage: { home: true } });
    } else {
        const {
            latestNews
        } = parse(req.headers.cookie);
        if (!latestNews) {
            res.render('home', { activePage: { home: true } });
        } else {
            verifyCookie(latestNews, SECRET, (err, username) => {
                if (err) {
                    res.render('home', { activePage: { home: true } });
                } else {
                    const message = `You are logged in as: ${username}`;
                    res.render('news', { loggedIn });
                }
            });
        }

    }
});
//login route
router.get('/login', (req, res) => {
    res.render('login');
});
//handle login route
router.post('/login', (req, res, next) => {
    let { username, password } = req.body; findHashedPassword(username, (dbRes) => {
        //if username doesn't exists in database, send back a message
        if (dbRes.length === 0) {
            const message = "Sorry, you need to register first."
            res.render("register", { message, main: true });
        } else {
            compareHashes(password, dbRes[0].password_hash, (err, match) => {
                if (err) {
                    const message = "Sorry, something went wrong. Try again."
                    res.render("login", { message, main: true });
                } else {
                    if (!match) {
                        const message = "Incorrect password. Try again."
                        res.render("login", { message, main: true });
                    } else {
                        //generate cookie
                        const cookie = createCookie(username);
                        const week = 1000 * 60 * 60 * 24 * 7;
                        res.cookie("latestNews", cookie, { maxAge: week * 1, httpOnly: true });
                        res.render("news");
                    }
                }
            });
        }
    });
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
        if (dbRes.length === 1) {
            const message = "Sorry, this username is already taken."
            res.render("register", { message, main: true });
        } else {
            createHash(password, (hash) => {
                //register user in database
                createUser(username, hash, (user) => {
                    //generate cookie
                    const cookie = createCookie(username);
                    const week = 1000 * 60 * 60 * 24 * 7;
                    res.cookie("latestNews", cookie, { maxAge: week * 1, httpOnly: true });
                    res.render("news");
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