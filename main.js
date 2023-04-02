#!/usr/bin nodejs
const http      = require('node:http');
const fs        = require('node:fs');
const express   = require ('express');
const app       = express();
const url       = require('url');
const { json } = require('body-parser');
const file      = "movieHouse.db"; 
const exists    = fs.existsSync(file);
if(!exists) {
    fs.openSync(file, "w"); 
}
const sqlite3   = require("sqlite3").verbose(); 
const db        = new sqlite3.Database(file);
let movieID = null;
let movieArray = [];
let artistArray = [];

//DATABASE
db.serialize(function() { 
    if(!exists) { 
        db.run("CREATE TABLE Movie ("
            +"movieID INTEGER, "
            +"movieName TEXT, "
            +"movieYear INTEGER, "
            +"movieGenre TEXT, "
            +"movieLink TEXT, "
            +"posterLink TEXT, "
            +"trailerLink TEXT, "
            +"movieAbout TEXT, "
            +"moviePlot TEXT)"
        )  

        db.run("CREATE TABLE Artist ("
            +"artistMovie INTEGER, "
            +"artistRole TEXT, "
            +"artistName TEXT, "
            +"artistYearBirth TEXT, "
            +"artistYearDeath TEXT, "
            +"artistLink TEXT, "
            +"artistArray TEXT, "
            +"artistInfo TEXT, "
            +"CONSTRAINT artist_fk FOREIGN KEY (artistMovie) REFERENCES Movie (rowid)"
            +")"
        )
        
        const stmtMovie = db.prepare("INSERT INTO Movie (movieID, movieName, movieYear, movieGenre, movieLink, posterLink, trailerLink, movieAbout, moviePlot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        const stmtArtist = db.prepare("INSERT INTO Artist (artistMovie, artistRole, artistName, artistYearBirth, artistYearDeath, artistLink, artistArray, artistInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        stmtMovie.run(
            0,
            "12 Angry Men",
            1957,
            "courtroom drama",
            "https://en.wikipedia.org/wiki/12_Angry_Men_(1957_film)",
            "https://en.wikipedia.org/wiki/12_Angry_Men_%281957_film%29#/media/File:12_Angry_Men_(1957_film_poster).jpg",
            "https://www.youtube.com/watch?v=TEN-2uTi2c0",
            'The movie is an American film directed by Sidney Lumet, adapted from a 1954 teleplay of the same name by Reginald Rose. The film tells the story of a jury of 12 men as they deliberate the conviction or acquittal of a teenager charged with murder on the basis of reasonable doubt; disagreement and conflict among them force the jurors to question their morals and values. It stars Henry Fonda (who also produced the film with Reginald Rose), Lee J. Cobb, Ed Begley, E. G. Marshall, and Jack Warden.',
            'In the sweltering jury room of the New York County Courthouse, a jury prepares to deliberate the case of an impoverished teenager accused of stabbing his abusive father to death. The judge instructs the Jury that if there is any reasonable doubt, the jurors are to return a verdict of not guilty; if found guilty, the defendant will receive a mandatory death sentence via the electric chair. The verdict must be unanimous.'
        );
        stmtMovie.run(
            1,
            "test", 
            2000, 
            "testgenre",
            "www.wikipedia.org",
            "www.wikipedia.org",
            "www.youtube.com",
            "this movie is about nothing",
            "this is a plotless movie"        
        );

        stmtArtist.run(
            0, 
            "director", 
            "Sidney Lumet",
            1924,
            2011,
            "https://en.wikipedia.org/wiki/Sidney_Lumet",
            'Dog Day Afternoon (1975), Network (1976), The Verdict (1982), Prince of the City (1981)',
            'Something'
        );

        stmtArtist.run(
            0, 
            "writer", 
            "Reginald Rose",
            1920,
            2002,
            "https://en.wikipedia.org/wiki/Reginald_Rose",
            'Crime in the Streets (1956), The Porcelain Year (1950), Sacco-Vanzetti Story (1960), Black Monday (1962), Dear Friends (1968), This Agony, This Triumph (1972)',
            'Something'
        );

        stmtArtist.run(
            0,
            "actor",
            "Martin Balsam",
            1919,
            1996,
            "https://en.wikipedia.org/wiki/Martin_Balsam",
            'something (year), something (year), something (year)',
            "Something"
        )

        stmtArtist.run(
            1,
            "director",
            "NoNameDirector",
            1998,
            null,
            "www.wikipedia.org",
            'something in (1999), and something in (2023), last thing was in (2050)',
            "Not an interesting person"
        )

        stmtArtist.run(
            1,
            "writer",
            "NoNameWriter",
            1998,
            null,
            "www.wikipedia.org",
            'something in (1999), and something in (2023), last thing was in (2050)',
            "Not an interesting person"
        )

        stmtArtist.run(
            1,
            "actor",
            "NoNameActor",
            1998,
            null,
            "www.wikipedia.org",
            'something in (1999), and something in (2023), last thing was in (2050)',
            "Not an interesting person"
        )


        stmtMovie.finalize();
        stmtArtist.finalize();
    }

    // db.each("SELECT movieID, movieName, movieYear, movieGenre, movieLink, posterLink, trailerLink, movieAbout, moviePlot FROM Movie", function(err, row) {
    //      movieArray.push({movieID: row.movieID, movieName: row.movieName, movieYear: row.movieYear, movieGenre: row.movieGenre, movieLink: row.movieLink, posterLink: row.posterLink, trailerLink: row.trailerLink, movieAbout: row.movieAbout, moviePlot: row.moviePlot});
    // });
    db.each("SELECT artistMovie, artistRole, artistName, artistYearBirth, artistYearDeath, artistLink, artistArray, artistInfo FROM Artist", function(err, row) {
        artistArray.push({artistMovie: row.artistMovie, artistRole: row.artistRole, artistName: row.artistName, artistYearBirth: row.artistYearBirth, artistYearDeath: row.artistYearDeath, artistLink: row.artistLink, artistArray: row.artistArray, artistInfo: row.artistInfo});
    });
});


//LINK EJS PAGES
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.get('/', (req, res) =>{
    res.render('index')
});
app.get('/home', (req, res) =>{
res.render('index')
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
app.get('/cast-AM', (req, res) =>{
res.render('cast-members')
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
app.get('/info', (req, res) => {
    movieID = req.query.id;
    let movie = db.serialize(function () {
        db.get("SELECT movieID, movieName, movieYear, movieGenre, movieLink, posterLink, trailerLink, movieAbout, moviePlot "
        + "FROM Movie WHERE MovieID= ?", movieID, (err, row) => {
            return row;
        });
    });
    console.log("movie = ");
    console.log(movie); // results in movie = Database {}


    // let movie = movieArray.find(obj => {
    //     return obj.movieID == movieID;
    // });
    let artists = [];
    for (let i = 0; i < artistArray.length; i++){
        if (artistArray[i].artistMovie == movieID) artists.push(artistArray[i]);
    }

    res.render('info', {
        ejsMovie: JSON.stringify(movie),
        ejsArtists: JSON.stringify(artists)
    });
});

app.all("*", (req,res) => {
    res.status(404).send("resource not found ... ");
});
app.listen(PORT=5001, (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});
db.close();