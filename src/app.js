//handle routes and serve pages
const express = require('express');
//to read filepaths
const path = require('path');
//to serve favicon
const favicon = require('serve-favicon');
//to render pages in handlebar templates
const handlebars = require('express-handlebars');
//import controllers
const controllers = require('./controllers');
//import helpers
const helpers = require('./views/helpers');
//parse incoming request bodies in a middleware
const bodyParser = require('body-parser');
//parse Cookie header and populate req.cookies with an object keyed by the cookie names
const cookieParser = require('cookie-parser');

//define app
const app = express();
//hide info in headers about our engine
app.disable("x-powered-by");

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main',
        helpers,
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json())

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

module.exports = app;