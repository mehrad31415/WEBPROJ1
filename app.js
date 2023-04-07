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

// session
const session = require('express-session')
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

let movieID = null;
let movieArray = [];
let artistArray = [];

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
        ejsArtists: JSON.stringify(artists).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[1\]|\[2\]|\[3\]|\[4\]||\[5\]|\[6\]|\[7\]|\[8\]|\[9\]/g, ''),
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@')
    });
});
app.get('/tickets', async (req, res) =>{
    movieID = req.query.id;
    const date = req.query.date;
    const time = req.query.time;
    
    const movie = await getMovieByID(db, movieID);
    const schedule = await getScheduleDateTime(db,movieID);
    const orderAll = await getAllOrders(db);

    res.render('tickets', {
        ejsMovie: JSON.stringify(movie).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[.*?\]/g, ''),
        ejsDate: date,
        ejsTime: time,
        ejsSchedule: JSON.stringify(schedule).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@'),
        ejsOrderAll: JSON.stringify(orderAll).replace(/'/g, "\\'").replaceAll('\\"', '???')
    });
});

// Login stuff
app.get('/account', async (req, res) =>{
    res.render('account');
});

// Login stuff
// http://localhost:3000/auth
app.post('/auth', async (req, res) => {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;

	// Ensure the input fields exists and are not empty
	if (username && password) {
        let query = 
        "SELECT * FROM user WHERE username = ? AND password = ?";
        
        // Query the database
        db.all(query, [username, password], (err, rows) => {
        if (err) {
            throw err;
        }
        // Do something with the rows of data
        console.log(rows);

        // If the user exists
        if (rows.length > 0) {
            // Set the session

            // TODO - set the session
            req.session.loggedin = true;
            req.session.username = username;

            // Redirect to the home page
            res.redirect('/home');
        } else {
            // Redirect to the login page
            res.send('Incorrect Username and/or Password!');
        }
        });

	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
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

async (db) => { await db.close();};

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

async function getAllOrders(db) {
    let orderAll = [];
    orderAll = new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT order_id AS orderID "
        + "FROM Ordering", (err, row) => { 
            arr.push(row);
            if (err) reject(err);
            resolve(arr);
        });
        
    });
    return orderAll;
}