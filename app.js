// external packages
const express = require('express');

// express application
const app     = express();

// internal packages
const path    = require('node:path');

// logger added. first middleware is a logger.
const morgan = require('morgan');
app.use(morgan('dev'));

// requiring the db so that when the server closes we close the database access.
const {db} = require('./controllers/db');

// body-parser: from version 4 of express, it has a built in body-parser urlencoded.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// according to https://www.npmjs.com/package/express-session the cookie parser does not need to be installed from 1.5.0 of express-session.
// cookieparser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// session. second middleware are the session and presentation.
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// static files (presentation).
app.use(express.static(path.join(__dirname, 'public')));

// LINK EJS PAGES. The template engine we used is EJS.
// the views are in the views folder. Using EJS it automatically searches for a views folder.
// it is safe to manually write the path.
app.set("views", path.resolve(__dirname, "./views"));
app.set('view engine', 'ejs');

// routers
const angryMenRouter = require('./routes/angry-men');
app.use('/angry-men', angryMenRouter);

const ajaxRouter = require('./routes/ajax');
app.use('/ajax', ajaxRouter);

const ticketsRouter = require('./routes/tickets');
app.use('/tickets', ticketsRouter);

const infoRouter = require('./routes/info');
app.use('/info', infoRouter);

const loginRouter = require('./routes/login');
app.use('/', loginRouter);

// further express methods.
app.get(('/'), (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/order-unf', (req, res) => {
    res.render('order-unf');
});

// for the resource not found, we have created a simple page with the message 'resource not found'.
// but the styling is not plane and it is somewhat like our website for aesthetic matters. 
// Also the user is guided to to get back to the root page.
app.all("*", (req, res) => {
    res.status(404).render('resource-not-found', {resource : req.url});
});

// the following allows the server to run on 127.0.0.1:5500 (alternatively it can run on localhost:5500).
const server = app.listen(PORT = 5500, HOSTNAME = '127.0.0.1', (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});

// when the server is shut down, the database access is also shut down.
process.on('SIGINT', () => {
    db.close();
    server.close();
});