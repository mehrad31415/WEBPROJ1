#!/usr/bin nodejs
const http      = require('node:http');
const fs        = require('node:fs');
const express   = require ('express');
const app       = express();
const url       = require('url');
const file      = "movieHouse.db"; 
const exists    = fs.existsSync(file);
if(!exists) {
    fs.openSync(file, "w"); 
}
const sqlite3   = require("sqlite3").verbose(); 
const db        = new sqlite3.Database(file);

//DATABASE
db.serialize(function() { 
    if(!exists) { 
        db.run("CREATE TABLE Movie ("
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
        
        const stmtMovie = db.prepare("INSERT INTO Movie (movieName, movieYear, movieGenre, movieLink, posterLink, trailerLink, movieAbout, moviePlot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        const stmtArtist = db.prepare("INSERT INTO Artist (artistMovie, artistRole, artistName, artistYearBirth, artistYearDeath, artistLink, artistArray, artistInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        stmtMovie.run(
            "12 Angry Men",
            1957,
            "courtroom drama",
            "https://en.wikipedia.org/wiki/12_Angry_Men_(1957_film)",
            "https://en.wikipedia.org/wiki/12_Angry_Men_%281957_film%29#/media/File:12_Angry_Men_(1957_film_poster).jpg",
            "https://www.youtube.com/watch?v=TEN-2uTi2c0",
            'The movie is an American film directed by Sidney Lumet, adapted from a 1954 teleplay of the same name by Reginald Rose. The film tells the story of a jury of 12 men as they deliberate the conviction or acquittal of a teenager charged with murder on the basis of reasonable doubt; disagreement and conflict among them force the jurors to question their morals and values. It stars Henry Fonda (who also produced the film with Reginald Rose), Lee J. Cobb, Ed Begley, E. G. Marshall, and Jack Warden.',
            'In the sweltering jury room of the New York County Courthouse, a jury prepares to deliberate the case of an impoverished teenager accused of stabbing his abusive father to death. The judge instructs the Jury that if there is any reasonable doubt, the jurors are to return a verdict of not guilty; if found guilty, the defendant will receive a mandatory death sentence via the electric chair. The verdict must be unanimous.'
        )
        stmtMovie.run(
            "test", 
            2000, 
            "testgenre",
            "www.wikipedia.org",
            "www.wikipedia.org",
            "www.youtube.com",
            "this movie is about nothing",
            "this is a plotless movie"        
        )

        stmtMovie.finalize();
        stmtArtist.finalize();
        db.each("SELECT rowid FROM Movie", function(err, row) { 
            console.log("movieName = " + row.rowid);
        });
    }
});

//LINK EJS
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
    const id = req.query.id;
    res.render('info', {
        ejsid: id,
        testvalue: 28
    });
});


db.close();

app.all("*", (req,res) => {
    res.status(404).send("resource not found ... ");
});
app.listen(PORT=5001, (req, res) => {
    console.log(`server is running on port ${PORT}...`);
});

