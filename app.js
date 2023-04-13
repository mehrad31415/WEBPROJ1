const fs = require('node:fs');
const express = require('express');
const path = require('node:path');
const file = "models/database/movie.db";
const exists = fs.existsSync(file);
const app = express();

// if database does not exist, create new one with write option.
if (!exists) {
    fs.openSync(file, "w");
};

// connection to the database.
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

// logger added. first middleware is a logger.
const morgan = require('morgan');
app.use(morgan('dev'));

// body-parser: from version 4 of express is has a built in body-parser urlencoded.
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));

// according to https://www.npmjs.com/package/express-session the cookie parser does not need to be installed from 1.5.0 of express-session.
//cookieparser
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// session. second middleware are the session and presentation.
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// static files (presentation).
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false
}));

// LINK EJS PAGES. The template engine we used is EJS.
// the views are in the views folder. Using EJS it automatically searches for a views folder.
// However it is safe to include the following line.
app.set("views", path.resolve(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get(('/'), (req, res) => {
    res.render('index');
});
app.get('/adaptations-AM', (req, res) => {
    res.render('adaptations-and-parodies');
});
app.get('/plot-AM', (req, res) => {
    res.render('angry-men-home');
});
app.get('/awards-AM', (req, res) => {
    res.render('awards');
});
app.get('/cast-AM', async (req, res) => {
    const artists = await getArtistsByID(0);
    res.render('cast-members', {
        ejsArtists: JSON.stringify(artists).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[1\]|\[2\]|\[3\]|\[4\]|\[5\]|\[6\]|\[7\]|\[8\]|\[9\]/g, '')
    });
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/reviews-AM', (req, res) => {
    res.render('reviews');
});
app.get('/transcripts-AM', (req, res) => {
    res.render('transcripts');
});
app.get('/info', async (req, res) => {
    const movieID = req.query.id;
    const movie = await getMovieByID(movieID);
    const artists = await getArtistsByID(movieID);
    const schedule = await getScheduleDateTime(movieID);
    res.render('info', {
        ejsMovie: JSON.stringify(movie).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[.*?\]/g, ''),
        ejsArtists: JSON.stringify(artists).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[1\]|\[2\]|\[3\]|\[4\]|\[5\]|\[6\]|\[7\]|\[8\]|\[9\]/g, ''),
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@')
    });
});
app.get('/tickets', async (req, res) => {
    const movieID = req.query.id;
    const date = req.query.date;
    const time = req.query.time;
    const movie = await getMovieByID(movieID);
    const schedule = await getScheduleDateTime(movieID);
    const orderAll = await getNrOfOrders();

    let movies = await getAllMovies();
    res.cookie('movies', JSON.stringify(movies).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });

    res.render('tickets', {
        ejsMovie: JSON.stringify(movie).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[.*?\]/g, ''),
        ejsDate: date,
        ejsTime: time,
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@'),
        ejsOrderAll: JSON.stringify(orderAll)
    });
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
    // console.log('routed to /pur')
    if (req.cookies.newOrder) {
        order = JSON.parse(req.cookies.newOrder);
        db.run('INSERT INTO Ordering (order_id, user_id, movie_id, date, num_of_tickets) VALUES(?, ?, ?, ?, ?)', [order.order_id, order.user_id, order.movie_id, order.date, order.ammount]);
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
    res.render('sign In');
});
// END of login stuff

app.get('/ajax/timeslots', async (req, res) => {
    const movieIDTemp = req.query.movieId;
    const schedule = await getScheduleDateTime(movieIDTemp);
    const scheduleString = JSON.stringify(schedule).replace(/'/g, "\\'");
    res.json(JSON.parse(scheduleString));
});

app.get('/ajax/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const movies = await getMoviesByAmmount(startIndex, pageSize);
    const moviesString = JSON.stringify(movies).replace(/'/g, "\\'").replaceAll('\\"', '???');
    res.json(JSON.parse(moviesString));
});

app.all("*", (req, res) => {
    res.status(404).send("resource not found ... ");
});

app.listen(PORT = 5500, HOSTNAME = '127.0.0.1', (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});

async function getMovieByID(id) {
    const movie = new Promise((resolve, reject) => {
        db.get("SELECT movie_id AS movieID, title AS movieName, year AS movieYear, genre AS movieGenre, link AS movieLink, poster AS posterLink, trailer AS trailerLink, about AS movieAbout, plot AS moviePlot "
            + "FROM Movie WHERE MovieID = ?", id, (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
    return movie;
};

async function getArtistsByID(id) {
    let artists = [];
    artists = new Promise((resolve, reject) => {
        let arr = [];
        db.each(
            "SELECT Artist.artist_id AS artistID, "
            + "movie_id AS artistMovie, "
            + "role AS artistRole, "
            + "name AS artistName, "
            + "birth AS artistYearBirth, "
            + "death AS artistYearDeath, "
            + "link AS artistLink, "
            + "information AS artistArray, "
            + "about AS artistInfo "
            + "FROM Artist "
            + "JOIN Role "
            + "ON Artist.artist_id = Role.artist_id "
            + "WHERE artistMovie= ?"
            , id, (err, row) => {
                arr.push(row);
                if (err) reject(err);
                resolve(arr);
            });
    });
    return artists;
}

async function getAllMovies() {
    let movieAll = [];
    movieAll = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT movie_id AS movieID, title AS movieName, year AS movieYear "
            + "FROM Movie", (err, row) => {
                arr.push(row);
                if (err) reject(err);
                resolve(arr);
            });

    });
    return movieAll;
}

async function getMoviesByAmmount(start, size) {
    let movieAll = [];
    movieAll = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT movie_id AS movieID, title AS movieName, year AS movieYear "
            + "FROM Movie LIMIT ?, ?", [start, size], (err, row) => {
                arr.push(row);
                if (err) reject(err);
                resolve(arr);
            });

    });
    return movieAll;
}

async function getScheduleDateTime(id) {
    let schedule = [];
    try {
        schedule = new Promise((resolve, reject) => {
            let arr = [];
            db.each("SELECT * "
                + "FROM Schedule "
                + "WHERE movie_id= ?", id, (err, row) => {
                    arr.push(row);
                    if (err) reject(err);
                    resolve(arr);
                });

        })
    } catch (error) { console.log(error); return null; }
    return schedule;
}

async function getNrOfOrders() {
    let orderAll;
    orderAll = new Promise((resolve, reject) => {
        let nr;
        db.each("SELECT COUNT(order_id) AS count "
            + "FROM Ordering", (err, row) => {
                nr = row;
                if (err) reject(err);
                resolve(nr.count);
            });

    });
    return orderAll;
}
async function getNrOfOrdersByUser(id) {
    let orderCount;
    orderCount = new Promise((resolve, reject) => {
        let nr;
        db.each("SELECT COUNT(order_id) AS count "
            + "FROM ordering WHERE user_id = ?", id, (err, row) => {
                nr = row;
                if (err) reject(err);
                resolve(nr.count);
            });

    });
    return orderCount;
}
async function getNrOfUsers() {
    let userAll = [];
    userAll = new Promise((resolve, reject) => {
        let nr;
        db.each("SELECT COUNT(user_id) AS count "
            + "FROM user", (err, row) => {
                nr = row;
                if (err) reject(err);
                resolve(nr.count);
            });

    });
    return userAll;
}

async function getOrdersByUser(id) {
    let userOrders = [];
    userOrders = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT date, num_of_tickets, title "
            + "FROM ("
            + "Ordering JOIN Movie "
            + "ON Ordering.movie_id = Movie.movie_id) "
            + "WHERE user_id = ?", id, (err, row) => {
                if (row) {
                    arr.push(row);
                } else {
                    arr = null;
                }
                if (err) reject(err);
                resolve(arr);
            });

    });
    return userOrders;
}

async function getUserByID(id) {
    const movie = new Promise((resolve, reject) => {

        db.get("SELECT * "
            + "FROM User WHERE user_id= ?", id, (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
    return movie;
};