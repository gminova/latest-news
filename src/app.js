//handle routes and serve pages
const express = require('express');
//to read filepaths
const path = require('path');
//to serve favicon, duh
const favicon = require('serve-favicon');
//to render pages in handlebar templates
const handlebars = require('express-handlebars');
//import controllers
const controllers = require('./constrollers/index');


const app = express();

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

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

module.exports = app;