const sqlite3 = require('sqlite3').verbose();
const path = require('node:path');
// movies
const angryMen = require('./tables/movies/12AngryMen');
const blackFish = require('./tables/movies/blackfish');
const bladeRunner = require('./tables/movies/bladeRunner');
const dragonTatoo = require('./tables/movies/dragonTatoo');
const godFather = require('./tables/movies/godfather');
const hangover = require('./tables/movies/hangover');
const indianaJones = require('./tables/movies/indianaJones');
const lalaLand = require('./tables/movies/laLaLand');
const lordRings = require('./tables/movies/lordOfTheRings');
const notebook = require('./tables/movies/notebook');
const privateRyan = require('./tables/movies/privateRyan');
const rocky = require('./tables/movies/rocky');
const schindlerList = require('./tables/movies/schindlerList');
const shawshankRedemption = require('./tables/movies/shawshankRedemption');
const shining = require('./tables/movies/shining');
const silenceLambs = require('./tables/movies/silenceLambs');
const terminator = require('./tables/movies/terminator');
const theoryOfEverything = require('./tables/movies/theoryOfEverything');
const toyStory = require('./tables/movies/toyStory');
const unforgiven = require('./tables/movies/unforgiven');

// users
const userOne = require('./tables/users/userOne');
const userTwo = require('./tables/users/userTwo');
const userThree = require('./tables/users/userThree');
const userFour = require('./tables/users/userFour');
const userFive = require('./tables/users/userFive');

// orders
const orderOne = require('./tables/orders/orderOne');
const orderTwo = require('./tables/orders/orderTwo');
const orderThree = require('./tables/orders/orderThree');
const orderFour = require('./tables/orders/orderFour');
const orderFive = require('./tables/orders/orderFive');
const orderSix = require('./tables/orders/orderSix');
const orderSeven = require('./tables/orders/orderSeven');
const orderEight = require('./tables/orders/orderEight');
const orderNine = require('./tables/orders/orderNine');
const orderTen = require('./tables/orders/orderTen');

// schedule
const schedule1 = require('./tables/schedule/schedule1');
const schedule2 = require('./tables/schedule/schedule2');
const schedule3 = require('./tables/schedule/schedule3');
const schedule4 = require('./tables/schedule/schedule4');
const schedule5 = require('./tables/schedule/schedule5');
const schedule6 = require('./tables/schedule/schedule6');
const schedule7 = require('./tables/schedule/schedule7');
const schedule8 = require('./tables/schedule/schedule8');
const schedule9 = require('./tables/schedule/schedule9');
const schedule10 = require('./tables/schedule/schedule10');
const schedule11 = require('./tables/schedule/schedule11');
const schedule12 = require('./tables/schedule/schedule12');
const schedule13 = require('./tables/schedule/schedule13');
const schedule14 = require('./tables/schedule/schedule14');

// artists

// creating the database connection.
const db = new sqlite3.Database(path.resolve(__dirname, 'database/movie.db'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("database connection is open...");
})

// its safe to nest the serialize.
db.serialize(() => {
    // these lines have to be dropped when the database is finished.
    db.run(`DROP TABLE movie`);
    db.run(`DROP TABLE user`);
    db.run(`DROP TABLE ordering`);
    db.run(`DROP TABLE schedule`);
    //
    // creating tables based on the schema in the database_model file.
    // table movie created
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
        if (err) { 
            console.error(err); 
        } else {
            console.log("table movie created...");
        }
    });
    // table schedule created
    db.run(`CREATE TABLE IF NOT EXISTS schedule(
        schedule_id INTEGER PRIMARY KEY,
        movie_id    INTEGER NOT NULL   ,
        date        TEXT    NOT NULL   ,
        /* constraints */
        FOREIGN KEY (movie_id) REFERENCES movie (movie_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`, (err) => {
        if (err) { 
            console.error(err); 
        } else {
            console.log("table schedule created...");
        }
    });
    // table user created
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
        if (err) { 
            console.error(err); 
        } else {
            console.log("table user created...");
        }
    });
    // table ordering created (order cannot be the name of a table as it is a keyword in sql, so we named it ordering)
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
        if (err) { 
            console.error(err); 
        } else {
            console.log("table ordering created...");
        }
    });
    // table artist created
    db.run(`CREATE TABLE IF NOT EXISTS artist (
        artist_id   INTEGER        PRIMARY KEY      ,
        name        VARCHAR(255)   NOT NULL         ,
        birth       CHAR(4)                         ,
        death       CHAR(4)                         ,
        link        VARCHAR(255)   NOT NULL UNIQUE  ,
        information VARCHAR(255)   NOT NULL UNIQUE  ,
        about       TEXT           NOT NULL         
    )`, (err) => {
        if (err) { 
            console.error(err); 
        } else {
            console.log("table artist created...");
        }
    });
    // table role created
    db.run (`CREATE TABLE IF NOT EXISTS role (
        role_id   INTEGER           PRIMARY KEY AUTOINCREMENT  ,
        artist_id INTEGER           NOT NULL                   ,
        movie_id  INTEGER           NOT NULL                   ,
        role      VARCHAR (255)     NOT NULL                   ,
        /* constraints */
        FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON DELETE CASCADE ON UPDATE CASCADE ,
        FOREIGN KEY (movie_id)  REFERENCES movie (movie_id)  ON DELETE CASCADE ON UPDATE CASCADE
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("table role created...");
        }
    });
    db.serialize(() => {
        // inserting the data inside the movie table.
        // 12 angry men
        let params = [angryMen.movieId, angryMen.title, angryMen.genre, angryMen.year, angryMen.poster, angryMen.trailer, angryMen.link, angryMen.plot, angryMen.about];
        let placeholders = '(' + params.map((param) => '?').join(',') + ')';
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // blackfish
        params = [blackFish.movieId, blackFish.title, blackFish.genre, blackFish.year, blackFish.poster, blackFish.trailer, blackFish.link, blackFish.plot, blackFish.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // blade runner
        params = [bladeRunner.movieId, bladeRunner.title, bladeRunner.genre, bladeRunner.year, bladeRunner.poster, bladeRunner.trailer, bladeRunner.link, bladeRunner.plot, bladeRunner.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // dragon tatoo
        params = [dragonTatoo.movieId, dragonTatoo.title, dragonTatoo.genre, dragonTatoo.year, dragonTatoo.poster, dragonTatoo.trailer, dragonTatoo.link, dragonTatoo.plot, dragonTatoo.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // god father
        params = [godFather.movieId, godFather.title, godFather.genre, godFather.year, godFather.poster, godFather.trailer, godFather.link, godFather.plot, godFather.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // hangover
        params = [hangover.movieId, hangover.title, hangover.genre, hangover.year, hangover.poster, hangover.trailer, hangover.link, hangover.plot, hangover.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // indiana jones
        params = [indianaJones.movieId, indianaJones.title, indianaJones.genre, indianaJones.year, indianaJones.poster, indianaJones.trailer, indianaJones.link, indianaJones.plot, indianaJones.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // la la land
        params = [lalaLand.movieId, lalaLand.title, lalaLand.genre, lalaLand.year, lalaLand.poster, lalaLand.trailer, lalaLand.link, lalaLand.plot, lalaLand.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // lord of the rings
        params = [lordRings.movieId, lordRings.title, lordRings.genre, lordRings.year, lordRings.poster, lordRings.trailer, lordRings.link, lordRings.plot, lordRings.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // notebook
        params = [notebook.movieId, notebook.title, notebook.genre, notebook.year, notebook.poster, notebook.trailer, notebook.link, notebook.plot, notebook.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // private ryan
        params = [privateRyan.movieId, privateRyan.title, privateRyan.genre, privateRyan.year, privateRyan.poster, privateRyan.trailer, privateRyan.link, privateRyan.plot, privateRyan.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // rocky
        params = [rocky.movieId, rocky.title, rocky.genre, rocky.year, rocky.poster, rocky.trailer, rocky.link, rocky.plot, rocky.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // schinder's list
        params = [schindlerList.movieId, schindlerList.title, schindlerList.genre, schindlerList.year, schindlerList.poster, schindlerList.trailer, schindlerList.link, schindlerList.plot, schindlerList.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // shawshank redemption
        params = [shawshankRedemption.movieId, shawshankRedemption.title, shawshankRedemption.genre, shawshankRedemption.year, shawshankRedemption.poster, shawshankRedemption.trailer, shawshankRedemption.link, shawshankRedemption.plot, shawshankRedemption.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // shining
        params = [shining.movieId, shining.title, shining.genre, shining.year, shining.poster, shining.trailer, shining.link, shining.plot, shining.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // silence of the lambs
        params = [silenceLambs.movieId, silenceLambs.title, silenceLambs.genre, silenceLambs.year, silenceLambs.poster, silenceLambs.trailer, silenceLambs.link, silenceLambs.plot, silenceLambs.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // terminator
        params = [terminator.movieId, terminator.title, terminator.genre, terminator.year, terminator.poster, terminator.trailer, terminator.link, terminator.plot, terminator.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // theory of everything
        params = [theoryOfEverything.movieId, theoryOfEverything.title, theoryOfEverything.genre, theoryOfEverything.year, theoryOfEverything.poster, theoryOfEverything.trailer, theoryOfEverything.link, theoryOfEverything.plot, theoryOfEverything.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // toy story
        params = [toyStory.movieId, toyStory.title, toyStory.genre, toyStory.year, toyStory.poster, toyStory.trailer, toyStory.link, toyStory.plot, toyStory.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // unforgiven
        params = [unforgiven.movieId, unforgiven.title, unforgiven.genre, unforgiven.year, unforgiven.poster, unforgiven.trailer, unforgiven.link, unforgiven.plot, unforgiven.about];
        db.run('INSERT INTO movie VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the movie table...`);
            }
        });
        // inserting the data inside the user table.
        //user one
        params = [userOne.userId, userOne.username, userOne.email, userOne.login, userOne.password, userOne.address, userOne.creditCard, userOne.registeredDate];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO user VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the user table...`);
            }
        });
        // user two
        params = [userTwo.userId, userTwo.username, userTwo.email, userTwo.login, userTwo.password, userTwo.address, userTwo.creditCard, userTwo.registeredDate];
        db.run('INSERT INTO user VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the user table...`);
            }
        });
        // user three
        params = [userThree.userId, userThree.username, userThree.email, userThree.login, userThree.password, userThree.address, userThree.creditCard, userThree.registeredDate];
        db.run('INSERT INTO user VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the user table...`);
            }
        });
        // user four
        params = [userFour.userId, userFour.username, userFour.email, userFour.login, userFour.password, userFour.address, userFour.creditCard, userFour.registeredDate];
        db.run('INSERT INTO user VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the user table...`);
            }
        });
        // user five
        params = [userFive.userId, userFive.username, userFive.email, userFive.login, userFive.password, userFive.address, userFive.creditCard, userFive.registeredDate];
        db.run('INSERT INTO user VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the user table...`);
            }
        });
        // inserting the data inside the ordering table.
        // order one.
        params = [orderOne.orderId, orderOne.userId, orderOne.movieId, orderOne.date, orderOne.numTickets];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order two.
        params = [orderTwo.orderId, orderTwo.userId, orderTwo.movieId, orderTwo.date, orderTwo.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order three.
        params = [orderThree.orderId, orderThree.userId, orderThree.movieId, orderThree.date, orderThree.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order four.
        params = [orderFour.orderId, orderFour.userId, orderFour.movieId, orderFour.date, orderFour.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order five.
        params = [orderFive.orderId, orderFive.userId, orderFive.movieId, orderFive.date, orderFive.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order six.
        params = [orderSix.orderId, orderSix.userId, orderSix.movieId, orderSix.date, orderSix.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order seven.
        params = [orderSeven.orderId, orderSeven.userId, orderSeven.movieId, orderSeven.date, orderSeven.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order eight.
        params = [orderEight.orderId, orderEight.userId, orderEight.movieId, orderEight.date, orderEight.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order nine.
        params = [orderNine.orderId, orderNine.userId, orderNine.movieId, orderNine.date, orderNine.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // order ten.
        params = [orderTen.orderId, orderTen.userId, orderTen.movieId, orderTen.date, orderTen.numTickets];
        db.run('INSERT INTO ordering VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the ordering table...`);
            }
        });
        // inserting the data inside the schedule table.
        // schedule one.
        params = [schedule1.scheduleId, schedule1.movieId, schedule1.date];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule two.
        params = [schedule2.scheduleId, schedule2.movieId, schedule2.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule three.
        params = [schedule3.scheduleId, schedule3.movieId, schedule3.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule four.
        params = [schedule4.scheduleId, schedule4.movieId, schedule4.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule five.
        params = [schedule5.scheduleId, schedule5.movieId, schedule5.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule six.
        params = [schedule6.scheduleId, schedule6.movieId, schedule6.date];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule seven.
        params = [schedule7.scheduleId, schedule7.movieId, schedule7.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule eight.
        params = [schedule8.scheduleId, schedule8.movieId, schedule8.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule nine.
        params = [schedule9.scheduleId, schedule9.movieId, schedule9.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule ten.
        params = [schedule10.scheduleId, schedule10.movieId, schedule10.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });        
        // schedule eleven.
        params = [schedule11.scheduleId, schedule11.movieId, schedule11.date];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twelve.
        params = [schedule12.scheduleId, schedule12.movieId, schedule12.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirteen.
        params = [schedule13.scheduleId, schedule13.movieId, schedule13.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule fourteen.
        params = [schedule14.scheduleId, schedule14.movieId, schedule14.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
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

    // // actor table
    // db.run(`CREATE TABLE IF NOT EXISTS actor (
    //     artist_id   INTEGER       NOT NULL ,
    //     movie       VARCHAR(255)  NOT NULL ,
    //     FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    // )`, (err) => {
    //     if (err) { console.error(err); }
    // });
    // // director table
    // db.run(`CREATE TABLE IF NOT EXISTS director (
    //     artist_id   INTEGER       NOT NULL ,
    //     movie       VARCHAR(255)  NOT NULL ,
    //     FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    // )`, (err) => {
    //     if (err) { console.error(err); }
    // });
    // // writer table
    // db.run(`CREATE TABLE IF NOT EXISTS writer (
    //     artist_id   INTEGER       NOT NULL ,
    //     book        VARCHAR(255)           ,
    //     FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON UPDATE CASCADE ON DELETE SET NULL
    // )`, (err) => {
    //     if (err) { 
    //         console.error(err); 
    //     } else {
    //         console.log("table role created");
    //     }
    // });