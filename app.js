// external packages
const express = require('express');

// express application
const app     = express();

// internal packages
const path    = require('node:path');

// logger added. first middleware is a logger.
const morgan = require('morgan');
app.use(morgan('dev'));

// body-parser: from version 4 of express has a built in body-parser urlencoded.
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
// However it is safe to manually write the path.
app.set("views", path.resolve(__dirname, "./views"));
app.set('view engine', 'ejs');

// controllers
const {
    getMovieByID,
    getArtistsByMovieID,
    getAllMovies,
    getMoviesByAmount,
    getScheduleDate,
    getNrOfOrders,
    getNrOfOrdersByUser,
    getNrOfUsers,
    getOrdersByUser,
    getUserByID
} = require('./controllers/queries');

// routers
const angryMenRouter = require('./routes/angry-men');
app.use('/angry-men', angryMenRouter);

app.get(('/'), (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/info', async (req, res) => {
    res.render('info');
});
app.get('/info-fetch', async (req, res) => {
    const movieID = req.query.id;
    const movie = await getMovieByID(movieID);
    const artists = await getArtistsByMovieID(movieID);
    const schedule = await getScheduleDate(movieID);
    res.json({ movie, artists, schedule });
});
app.get('/tickets', async (req, res) => {
    res.render('tickets');
});
app.get('/tickets-fetch', async (req, res) => {
    const allMovies = await getAllMovies();
    const movieID = req.query.id;
    const date = req.query.date;
    const time = req.query.time;
    let amount = null;
    if (req.query.amount) amount = req.query.amount;
    const movie = await getMovieByID(movieID);
    const schedule = await getScheduleDate(movieID);
    const orderAll = await getNrOfOrders();
    res.json({ allMovies, movie, schedule, orderAll, date, time, amount});
});
app.get('/order-unf', (req, res) => {
    res.render('order-unf');
});

// Login stuff
app.get('/account', async (req, res) => {
    let userID = null;
    if (req.session.userID) userID = JSON.parse(req.session.userID);
    res.cookie('userID', userID, { httpOnly: false });
    const user = await getUserByID(userID);
    const nrOrders = await getNrOfOrdersByUser(userID);
    if (userID != null) {
        let orders = null;
        if (nrOrders > 0) orders = await getOrdersByUser(userID);
        res.cookie('orders', JSON.stringify(orders).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
        res.cookie('user', JSON.stringify(user).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
    }
    res.render('account');
});
app.get('/pur', (req, res) => {
    console.log(req.cookies);
    if (req.cookies.newOrder){
        order = JSON.parse(req.cookies.newOrder);
        db.run('INSERT INTO Ordering (order_id, user_id, movie_id, date, num_of_tickets) VALUES(?, ?, ?, ?, ?)', [order.order_id, order.user_id, order.movie_id, order.date, order.amount]);
        res.clearCookie("newOrder");
    }

    res.redirect('/account');
});

// Login stuff
// http://localhost:3000/auth
app.post('/auth', async (req, res) => {
    const log = req.query.log;
    switch (log) {
        case 'in':
            // Capture the input fields
            let login = req.body.login;
            let password = req.body.password;

            // Ensure the input fields exists and are not empty
            if (login && password) {
                let query = "SELECT * FROM user WHERE login = ? AND password = ?";

                // Query the database
                db.get(query, [login, password], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    // If the user exists
                    if (rows) {
                        // Set the session
                        req.session.loggedin = true;
                        req.session.userID = rows.user_id;
                        // Redirect to the account page
                        res.redirect('/account');
                    } else {
                        // Redirect to the login page
                        res.send('Incorrect Username and/or Password!');
                    }
                });
            } else {
                res.send('Please enter Username and Password!');
                res.end();
            }
            break;
        case 'out':
            //Destroy all unfinished order cookies: DOES NOT WORK YET
            Object.keys(req.cookies).forEach(function(cookieName) {
                if (cookieName.startsWith('ordersUnf')) {
                    res.clearCookie(cookieName);
                }
            });
            // Destroy the session
            req.session.destroy((err) => {
                if (err) {
                    throw err;
                }
                res.clearCookie("userID");
                // Redirect to the home page
                res.redirect('/');
            });
            break;
        case 'sign':
            const signUserID = await getNrOfUsers();
            const signUsername = req.body.username;
            const signEmail = req.body.email;
            const signLogin = req.body.login;
            const signPassword = req.body.password;
            const signAddress = req.body.address;
            const signCredit = req.body.creditcard;
            const signDate = new Date();
            db.run('INSERT INTO user '
                + '(user_id, username, email, login, password, address, credit_card, registered_date) '
                + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [
                signUserID,
                signUsername,
                signEmail,
                signLogin,
                signPassword,
                signAddress,
                signCredit,
                signDate.toISOString().replace('T', ' ').replace('Z', '')
            ]);
            // Set the session
            req.session.loggedin = true;
            req.session.userID = signUserID;
            // Redirect to the account page
            res.redirect('/account');
            break;
        default:
            res.redirect('/');
    }
});
app.get('/sign', (req, res) => {
    res.render('sign-in');
});
// END of login stuff

app.get('/ajax/timeslots', async (req, res) => {
    const movieIDTemp = req.query.movieId;
    const schedule = await getScheduleDate(movieIDTemp);
    const scheduleString = JSON.stringify(schedule).replace(/'/g, "\\'");
    res.json(JSON.parse(scheduleString));
});

app.get('/ajax/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const movies = await getMoviesByAmount(startIndex, pageSize);
    const moviesString = JSON.stringify(movies).replace(/'/g, "\\'").replaceAll('\\"', '???');
    res.json(JSON.parse(moviesString));
});

// for the resource not found, we have created a simple page with the message 'resource not found'.
// but the styling is not plane and it is somewhat like our website for aesthetic matters. 
// Also the user is guided to to get back to the root page.
app.all("*", (req, res) => {
    res.status(404).render('resource-not-found', {resource : req.url})
});

// the following allows the server to run on 127.0.0.1:5500 (alternatively it can run on localhost:5500).
app.listen(PORT = 5500, HOSTNAME = '127.0.0.1', (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});




// db needs to be separated in the controller and imported.
// the coockie parser needs to be removed.
// 