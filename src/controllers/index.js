const express = require('express');
const router = express.Router();

//import authentication helpers

//import database helpers

//import home route controller
const home = require('./home');
const news = require('./news');
const error = require('./error');

//get home route
router.get('/', home.get);
//register route
router.get('/register', req, res, next) => {
    const { username, password } = req.body;
}
router.get('/news', news.get);

//test 500 route in test mode only
if (process.env.NODE_ENV === "test") {
    const test = require('./test');
    router.get('/test', test.get);
}


router.use(error.client);
router.use(error.server);

module.exports = router;