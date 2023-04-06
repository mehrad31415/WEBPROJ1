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
const morgan = require('morgan')
app.use(morgan('dev'));

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
app.get('/tickets', (req, res) =>{
    res.render('tickets');
    movieID = req.query.id;
    day = req.query.day;
});
app.get('/acount', (req, res) =>{
    res.render('acount');
});
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