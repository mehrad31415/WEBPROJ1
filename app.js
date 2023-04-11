#!/usr/bin nodejs
const http      = require('node:http');
const fs        = require('node:fs');
const express   = require ('express');
const app       = express();
const url       = require('url');
const { json } = require('body-parser');
const file      = "models/database/movie.db"; 
const exists    = fs.existsSync(file);

if(!exists) {
    fs.openSync(file, "w"); 
}
const sqlite3   = require("sqlite3").verbose(); 
const db        = new sqlite3.Database(file);
// logger added
const morgan = require('morgan');
app.use(morgan('dev'));

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//cookieparser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// session
const session = require('express-session')
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

let movieID = null;

//LINK EJS PAGES
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.get(('/'), async (req, res) =>{
    const movieAll = await getAllMovies(db);
    res.render('index', {
        ejsMovieAll: JSON.stringify(movieAll).replace(/'/g, "\\'").replaceAll('\\"', '???')
    })
});
app.get('/home', async (req, res) =>{
    const movieAll = await getAllMovies(db);
    res.render('index', {
        ejsMovieAll: JSON.stringify(movieAll).replace(/'/g, "\\'").replaceAll('\\"', '???')
    })
});
app.get('/adaptations-AM', (req, res) =>{
res.render('adaptations-and-parodies')
});
app.get('/plot-AM', (req, res) =>{
    res.render('angry-men-home')
});
app.get('/awards-AM', (req, res) =>{
    res.render('awards')
});
app.get('/cast-AM', async (req, res) =>{
    const artists = await getArtistsByID(db,0);
    res.render('cast-members', {
        ejsArtists: JSON.stringify(artists)
    })
});
app.get('/contact', (req, res) =>{
res.render('contact')
});
app.get('/reviews-AM', (req, res) =>{
    res.render('reviews')
});
app.get('/transcripts-AM', (req, res) =>{
    res.render('transcripts')
});
app.get('/info', async (req, res) => {
    movieID = req.query.id;
    const movie = await getMovieByID(db, movieID);
    const artists = await getArtistsByID(db,movieID);
    const schedule = await getScheduleDateTime(db,movieID);
    res.render('info', {
        ejsMovie: JSON.stringify(movie).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[.*?\]/g, ''),
        ejsArtists: JSON.stringify(artists).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[1\]|\[2\]|\[3\]|\[4\]|\[5\]|\[6\]|\[7\]|\[8\]|\[9\]/g, ''),
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@')
    });
});
app.get('/tickets', async (req, res) =>{
    movieID = req.query.id;
    const date = req.query.date;
    const time = req.query.time;
    
    const movie = await getMovieByID(db, movieID);
    const schedule = await getScheduleDateTime(db,movieID);
    const orderAll = await getNrOfOrders(db);

    res.render('tickets', {
        ejsMovie: JSON.stringify(movie).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[.*?\]/g, ''),
        ejsDate: date,
        ejsTime: time,
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@'),
        ejsOrderAll: JSON.stringify(orderAll.count)
    });
});

// Login stuff
app.route('/account')
.get(async (req, res) =>{
    //TODO get userid from session
    const userID = req.session.userID;
    res.cookie('userID', userID, { httpOnly: false });
    const user = await getUserByID(db, userID);
    if (userID != null){
        const orders = await getOrdersByUser(db, userID);
        res.cookie('orders', JSON.stringify(orders).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
        res.cookie('user', JSON.stringify(user).replace(/'/g, "\\'").replaceAll('\\"', '???'), { httpOnly: false });
    }
    res.render('account');
})
.post(async (req, res) =>{
    res.redirect('/account');
});
app.get('/pur', (req, res) => {
    if (req.cookies.newOrder){
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
            let username = req.body.username;
            let password = req.body.password;
    
            // Ensure the input fields exists and are not empty
            if (username && password) {
                let query = "SELECT * FROM user WHERE username = ? AND password = ?";
    
                // Query the database
                db.get(query, [username, password], (err, rows) => {
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
              res.redirect('/home');
            });
            break;
        case 'sign':
            let signUserID = parseInt(await getNrOfUsers(db));
            let signUsername = req.body.username;
            let signEmail = req.body.email;
            let signLogin = req.body.login;
            let signPassword = req.body.password;
            let signAddress = req.body.address;
            let signCredit = req.body.creditcard;
            let signDate = new Date();
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
                signDate.toISOString()
            ], function (err) {
                if (err){
                    res.send('The information you entered is not compatible, please check your information')
                }
            });
            res.redirect('/account');
            break;
        default:
            res.redirect('/home');
    }
});
app.get('/sign', (req, res) =>{
    res.render('sign In')
});
// END of login stuff


app.get('/redirect', (req, res) =>{
    const url = req.query.url;
    res.status(301).redirect(url);
});
app.all("*", (req,res) => {
    res.status(404).send("resource not found ... ");
});
app.listen(PORT=5500, HOSTNAME='127.0.0.1', (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});

async function getMovieByID(db, id) {
    const movie =  new Promise((resolve, reject) => {
        db.get("SELECT movie_id AS movieID, title AS movieName, year AS movieYear, genre AS movieGenre, link AS movieLink, poster AS posterLink, trailer AS trailerLink, about AS movieAbout, plot AS moviePlot "
        + "FROM Movie WHERE MovieID= ?", id, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
    return movie;
}

async function getArtistsByID(db, id) {
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

async function getAllMovies(db) {
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

async function getScheduleDateTime(db, id) {
    let schedule = [];
    try {schedule = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT * "
        + "FROM Schedule "
        + "WHERE movie_id= ?", id, (err, row) => { 
            arr.push(row);
            if (err) reject(err);
            resolve(arr);
        });
        
    })} catch (error) { console.log(error); return null;}
    return schedule;
}

async function getNrOfOrders(db) {
    let orderAll = [];
    orderAll = new Promise((resolve, reject) => {
        let nr;
        db.each("SELECT COUNT(order_id) AS count "
        + "FROM Ordering", (err, row) => { 
            nr = row;
            if (err) reject(err);
            resolve(nr);
        });
        
    });
    return orderAll;
}

async function getNrOfUsers(db) {
    let userAll = [];
    userAll = new Promise((resolve, reject) => {
        let nr;
        db.each("SELECT COUNT(user_id) AS count "
        + "FROM user", (err, row) => { 
            nr = row;
            if (err) reject(err);
            resolve(nr);
        });
        
    });
    return userAll;
}

async function getOrdersByUser(db, id) {
    let userOrders = [];
    userOrders = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT date, num_of_tickets, title "
        + "FROM ("
        + "Ordering JOIN Movie "
        + "ON Ordering.movie_id = Movie.movie_id) "
        + "WHERE user_id = ?", id, (err, row) => { 
            arr.push(row);
            if (err) reject(err);
            resolve(arr);
        });
        
    });
    return userOrders;
}

async function getUserByID(db, id) {
    const movie =  new Promise((resolve, reject) => {
        
        db.get("SELECT * "
        + "FROM User WHERE user_id= ?", id, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
    return movie;
}