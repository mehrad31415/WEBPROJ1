const sqlite3 = require('sqlite3').verbose();

// movies
const angry_men = require('./movies/12-angry-men');

// creating the database connection.
const db = new sqlite3.Database('./database/movie.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("database connection is open...");
})

// its safe to nest the serialize.
db.serialize(() => {
    // creating tables based on the schema in the database_model file.
    db.run(`CREATE TABLE IF NOT EXISTS movie (
        movie_id    INTEGER         PRIMARY KEY  ,
        title       VARCHAR(255)    NOT NULL     ,
        genre       VARCHAR(255)    NOT NULL     ,
        year        CHAR(4)         NOT NULL     ,
        poster      BLOB            NOT NULL     ,
        trailer     VARCHAR(255)    NOT NULL     ,
        link        VARCHAR(255)    NOT NULL     ,
        plot        TEXT            NOT NULL     ,
        about       TEXT            NOT NULL     ,  
        /* constraints */
        UNIQUE(poster, trailer, link, plot, about)
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS schedule(
        schedule_id INTEGER PRIMARY KEY,
        movie_id    INTEGER NOT NULL   ,
        date        TEXT    NOT NULL   ,
        /* constraints */
        FOREIGN KEY (movie_id) REFERENCES movie (movie_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS user (
        user_id          INTEGER        PRIMARY KEY     ,
        username         VARCHAR(255)   NOT NULL UNIQUE ,
        email            VARCHAR(255)   NOT NULL UNIQUE ,
        login            VARCHAR(255)   NOT NULL UNIQUE ,
        password         VARCHAR(255)   NOT NULL        ,
        address          VARCHAR(255)                   ,
        credit_card      CHAR(18)       NOT NULL        ,
        registered_date  TEXT           NOT NULL
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS ordering (
        order_id       INTEGER PRIMARY KEY                ,
        user_id        INTEGER NOT NULL                   ,
        movie_id       INTEGER NOT NULL                   ,
        date           TEXT    NOT NULL                   ,
        num_of_tickets INTEGER NOT NULL                   ,
        /* constraints */
        FOREIGN KEY (user_id)  REFERENCES user(user_id)   ON UPDATE CASCADE ON DELETE CASCADE ,
        FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS artist (
        artist_id   INTEGER        PRIMARY KEY      ,
        name        VARCHAR(255)   NOT NULL         ,
        birth       CHAR(4)        NOT NULL         ,
        death       CHAR(4),
        link        VARCHAR(255)   NOT NULL UNIQUE  ,
        information VARCHAR(255)   NOT NULL UNIQUE  ,
        role        VARCHAR(255)   NOT NULL         ,
        movie_id    INTEGER        NOT NULL         ,
        /* constraints */
        FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON UPDATE CASCADE ON DELETE SET NULL
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS actor (
        artist_id   INTEGER       NOT NULL ,
        movie       VARCHAR(255)  NOT NULL ,
        FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS director (
        artist_id   INTEGER       NOT NULL ,
        movie       VARCHAR(255)  NOT NULL ,
        FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.run(`CREATE TABLE IF NOT EXISTS writer (
        artist_id   INTEGER       NOT NULL ,
        book        VARCHAR(255)           ,
        FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    )`, (err) => {
        if (err) { console.error(err); }
    });
    db.serialize(() => {
        // inserting the data inside the movie table.
        const params = [angry_men.movie_id, angry_men.title, angry_men.genre, angry_men.year, angry_men.poster, angry_men.trailer, angry_men.link, angry_men.plot, angry_men.about]
        const placeholders = '(' + params.map((param) => '?').join(',') + ')';
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted...`);
            }

        });
    });
    // query
    const sql = `SELECT * FROM movie`;
    db.get(sql, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row ? console.log("row found") : console.log("not found");
    });
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("database connection is closed...");
});