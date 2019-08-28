const express = require('express');
const router = express.Router();

//import home route controller
const home = require('./home');
const news = require('./news');
const error = require('./error');

//get home route
router.get('/', home.get);
router.get('/news', news.get);
router.use(error.client);
router.use(error.server);

module.exports = router;