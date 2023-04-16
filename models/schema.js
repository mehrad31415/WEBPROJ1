const sqlite3 = require('sqlite3').verbose();
const path    = require('node:path');
const fs      = require('node:fs');

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
const schedule15 = require('./tables/schedule/schedule15');
const schedule16 = require('./tables/schedule/schedule16');
const schedule17 = require('./tables/schedule/schedule17');
const schedule18 = require('./tables/schedule/schedule18');
const schedule19 = require('./tables/schedule/schedule19');
const schedule20 = require('./tables/schedule/schedule20');
const schedule21 = require('./tables/schedule/schedule21');
const schedule22 = require('./tables/schedule/schedule22');
const schedule23 = require('./tables/schedule/schedule23');
const schedule24 = require('./tables/schedule/schedule24');
const schedule25 = require('./tables/schedule/schedule25');
const schedule26 = require('./tables/schedule/schedule26');
const schedule27 = require('./tables/schedule/schedule27');
const schedule28 = require('./tables/schedule/schedule28');
const schedule29 = require('./tables/schedule/schedule29');
const schedule30 = require('./tables/schedule/schedule30');
const schedule31 = require('./tables/schedule/schedule31');
const schedule32 = require('./tables/schedule/schedule32');
const schedule33 = require('./tables/schedule/schedule33');
const schedule34 = require('./tables/schedule/schedule34');

// artists
const artist1 = require('./tables/artists/unforgiven/actor');
const artist2 = require('./tables/artists/unforgiven/writer');
const artist3 = require('./tables/artists/toyStory/director');
const artist4 = require('./tables/artists/theoryOfEverything/actor');
const artist5 = require('./tables/artists/theoryOfEverything/director');
const artist6 = require('./tables/artists/theoryOfEverything/writer');
const artist7 = require('./tables/artists/terminator/actor');
const artist8 = require('./tables/artists/terminator/director');
const artist9 = require('./tables/artists/silenceLambs/actor');
const artist10 = require('./tables/artists/silenceLambs/director');
const artist11 = require('./tables/artists/silenceLambs/writer');
const artist12 = require('./tables/artists/shining/actor');
const artist13 = require('./tables/artists/shining/director');
const artist14 = require('./tables/artists/shawshankRedemption/actor');
const artist15 = require('./tables/artists/shawshankRedemption/director');
const artist16 = require('./tables/artists/shawshankRedemption/writer');
const artist17 = require('./tables/artists/schindlerList/actor');
const artist18 = require('./tables/artists/schindlerList/writer');
const artist19 = require('./tables/artists/rocky/actor');
const artist20 = require('./tables/artists/rocky/director');
const artist21 = require('./tables/artists/privateRyan/actor');
const artist22 = require('./tables/artists/privateRyan/writer');
const artist23 = require('./tables/artists/notebook/actor');
const artist24 = require('./tables/artists/notebook/director');
const artist25 = require('./tables/artists/notebook/writer');
const artist26 = require('./tables/artists/lordRings/actor');
const artist27 = require('./tables/artists/lordRings/director');
const artist28 = require('./tables/artists/lordRings/writer');
const artist29 = require('./tables/artists/laLaLand/actor');
const artist30 = require('./tables/artists/laLaLand/director');
const artist31 = require('./tables/artists/indianaJones/actor');
const artist32 = require('./tables/artists/indianaJones/director');
const artist33 = require('./tables/artists/indianaJones/writer');
const artist34 = require('./tables/artists/hangover/actor');
const artist35 = require('./tables/artists/hangover/director');
const artist36 = require('./tables/artists/hangover/writer');
const artist37 = require('./tables/artists/godFather/actor');
const artist38 = require('./tables/artists/godFather/director');
const artist39 = require('./tables/artists/godFather/writer');
const artist40 = require('./tables/artists/dragonTatoo/actor');
const artist41 = require('./tables/artists/dragonTatoo/director');
const artist42 = require('./tables/artists/dragonTatoo/writer');
const artist43 = require('./tables/artists/bladeRunner/actor');
const artist44 = require('./tables/artists/bladeRunner/director');
const artist45 = require('./tables/artists/blackfish/actor');
const artist46 = require('./tables/artists/angryMen/director');
const artist47 = require('./tables/artists/angryMen/writer');
const artist48 = require('./tables/artists/angryMen/actors/JohnFiedler.js');
const artist49 = require('./tables/artists/angryMen/actors/LeeJCobb.js');
const artist50 = require('./tables/artists/angryMen/actors/eGMarshall.js');
const artist51 = require('./tables/artists/angryMen/actors/edBegley.js');
const artist52 = require('./tables/artists/angryMen/actors/edwardBinns.js');
const artist53 = require('./tables/artists/angryMen/actors/georgeVoskovec.js');
const artist54 = require('./tables/artists/angryMen/actors/henryFonda.js');
const artist55 = require('./tables/artists/angryMen/actors/jackKlugman.js');
const artist56 = require('./tables/artists/angryMen/actors/jackWarden.js');
const artist57 = require('./tables/artists/angryMen/actors/josephSweeney.js');
const artist58 = require('./tables/artists/angryMen/actors/martinBalsam.js');
const artist59 = require('./tables/artists/angryMen/actors/robertWebber.js');
const artist60 = require('./tables/artists/angryMen/actors/rudyBond.js');

// roles
const roles = [];
for (let i = 1; i <= 72; i++) {
    const roleName = `role${i.toString().padStart(2, '0')}`;
    roles.push(require(`./tables/role/${roleName}`));
}
const [role1, role2, role3, role4, role5, role6, role7, role8, role9, role10, role11, role12, role13, role14, role15, role16, role17, role18, role19, role20, role21, role22, role23, role24, role25, role26, role27, role28, role29, role30, role31, role32, role33, role34, role35, role36, role37, role38, role39, role40, role41, role42, role43, role44, role45, role46, role47, role48, role49, role50, role51, role52, role53, role54, role55, role56, role57, role58, role59, role60, role61, role62, role63, role64, role65, role66, role67, role68, role69, role70, role71, role72] =
    roles;
// creating the database connection.
const db = new sqlite3.Database(path.resolve(__dirname, 'database/movie.db'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("database connection is open...");
})

// its safe to nest the serialize.
db.serialize(() => {
    // if you already have any of these tables in your database uncomment the following lines and drop them.
    db.run(`DROP TABLE movie`);
    db.run(`DROP TABLE user`);
    db.run(`DROP TABLE ordering`);
    db.run(`DROP TABLE schedule`);
    db.run(`DROP TABLE artist`);
    db.run(`DROP TABLE role`);

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
    db.run(`CREATE TABLE IF NOT EXISTS role (
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
        // schedule fifteen.
        params = [schedule15.scheduleId, schedule15.movieId, schedule15.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule sixteen.
        params = [schedule16.scheduleId, schedule16.movieId, schedule16.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule seventeen.
        params = [schedule17.scheduleId, schedule17.movieId, schedule17.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule eighteen.
        params = [schedule18.scheduleId, schedule18.movieId, schedule18.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule nineteen.
        params = [schedule19.scheduleId, schedule19.movieId, schedule19.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty.
        params = [schedule20.scheduleId, schedule20.movieId, schedule20.date];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-one.
        params = [schedule21.scheduleId, schedule21.movieId, schedule21.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-two.
        params = [schedule22.scheduleId, schedule22.movieId, schedule22.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-three.
        params = [schedule23.scheduleId, schedule23.movieId, schedule23.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-four.
        params = [schedule24.scheduleId, schedule24.movieId, schedule24.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-five.
        params = [schedule25.scheduleId, schedule25.movieId, schedule25.date];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-six.
        params = [schedule26.scheduleId, schedule26.movieId, schedule26.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-seven.
        params = [schedule27.scheduleId, schedule27.movieId, schedule27.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-eight.
        params = [schedule28.scheduleId, schedule28.movieId, schedule28.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule twenty-nine.
        params = [schedule29.scheduleId, schedule29.movieId, schedule29.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirty.
        params = [schedule30.scheduleId, schedule30.movieId, schedule30.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirty-one.
        params = [schedule31.scheduleId, schedule31.movieId, schedule31.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirty-two.
        params = [schedule32.scheduleId, schedule32.movieId, schedule32.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirty-three.
        params = [schedule33.scheduleId, schedule33.movieId, schedule33.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // schedule thirty-four.
        params = [schedule34.scheduleId, schedule34.movieId, schedule34.date];
        db.run('INSERT INTO schedule VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the schedule table...`);
            }
        });
        // inserting values into the artist table
        // artist one.
        params = [artist1.artistId, artist1.name, artist1.birth, artist1.death, artist1.link, artist1.information, artist1.about];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist two.
        params = [artist2.artistId, artist2.name, artist2.birth, artist2.death, artist2.link, artist2.information, artist2.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist three.
        params = [artist3.artistId, artist3.name, artist3.birth, artist3.death, artist3.link, artist3.information, artist3.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist four.
        params = [artist4.artistId, artist4.name, artist4.birth, artist4.death, artist4.link, artist4.information, artist4.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist five.
        params = [artist5.artistId, artist5.name, artist5.birth, artist5.death, artist5.link, artist5.information, artist5.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist six.
        params = [artist6.artistId, artist6.name, artist6.birth, artist6.death, artist6.link, artist6.information, artist6.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist seven.
        params = [artist7.artistId, artist7.name, artist7.birth, artist7.death, artist7.link, artist7.information, artist7.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist eight.
        params = [artist8.artistId, artist8.name, artist8.birth, artist8.death, artist8.link, artist8.information, artist8.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist nine.
        params = [artist9.artistId, artist9.name, artist9.birth, artist9.death, artist9.link, artist9.information, artist9.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist ten.
        params = [artist10.artistId, artist10.name, artist10.birth, artist10.death, artist10.link, artist10.information, artist10.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist eleven.
        params = [artist11.artistId, artist11.name, artist11.birth, artist11.death, artist11.link, artist11.information, artist11.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twelve.
        params = [artist12.artistId, artist12.name, artist12.birth, artist12.death, artist12.link, artist12.information, artist12.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirteen.
        params = [artist13.artistId, artist13.name, artist13.birth, artist13.death, artist13.link, artist13.information, artist13.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fourteen.
        params = [artist14.artistId, artist14.name, artist14.birth, artist14.death, artist14.link, artist14.information, artist14.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifteen.
        params = [artist15.artistId, artist15.name, artist15.birth, artist15.death, artist15.link, artist15.information, artist15.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist sixteen.
        params = [artist16.artistId, artist16.name, artist16.birth, artist16.death, artist16.link, artist16.information, artist16.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist seventeen.
        params = [artist17.artistId, artist17.name, artist17.birth, artist17.death, artist17.link, artist17.information, artist17.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist eighteen.
        params = [artist18.artistId, artist18.name, artist18.birth, artist18.death, artist18.link, artist18.information, artist18.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist nineteen.
        params = [artist19.artistId, artist19.name, artist19.birth, artist19.death, artist19.link, artist19.information, artist19.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty.
        params = [artist20.artistId, artist20.name, artist20.birth, artist20.death, artist20.link, artist20.information, artist20.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-one.
        params = [artist21.artistId, artist21.name, artist21.birth, artist21.death, artist21.link, artist21.information, artist21.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-two.
        params = [artist22.artistId, artist22.name, artist22.birth, artist22.death, artist22.link, artist22.information, artist22.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-three.
        params = [artist23.artistId, artist23.name, artist23.birth, artist23.death, artist23.link, artist23.information, artist23.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-four.
        params = [artist24.artistId, artist24.name, artist24.birth, artist24.death, artist24.link, artist24.information, artist24.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-five.
        params = [artist25.artistId, artist25.name, artist25.birth, artist25.death, artist25.link, artist25.information, artist25.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist twenty-six.
        params = [artist26.artistId, artist26.name, artist26.birth, artist26.death, artist26.link, artist26.information, artist26.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist twenty-seven.
        params = [artist27.artistId, artist27.name, artist27.birth, artist27.death, artist27.link, artist27.information, artist27.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-eight.
        params = [artist28.artistId, artist28.name, artist28.birth, artist28.death, artist28.link, artist28.information, artist28.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist twenty-nine.
        params = [artist29.artistId, artist29.name, artist29.birth, artist29.death, artist29.link, artist29.information, artist29.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty.
        params = [artist30.artistId, artist30.name, artist30.birth, artist30.death, artist30.link, artist30.information, artist30.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty-one.
        params = [artist31.artistId, artist31.name, artist31.birth, artist31.death, artist31.link, artist31.information, artist31.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty-two.
        params = [artist32.artistId, artist32.name, artist32.birth, artist32.death, artist32.link, artist32.information, artist32.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty-three.
        params = [artist33.artistId, artist33.name, artist33.birth, artist33.death, artist33.link, artist33.information, artist33.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty-four.
        params = [artist34.artistId, artist34.name, artist34.birth, artist34.death, artist34.link, artist34.information, artist34.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist thirty-five.
        params = [artist35.artistId, artist35.name, artist35.birth, artist35.death, artist35.link, artist35.information, artist35.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist thirty-six.
        params = [artist36.artistId, artist36.name, artist36.birth, artist36.death, artist36.link, artist36.information, artist36.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the artist table...`);
            }
        });
        // artist thirty-seven.
        params = [artist37.artistId, artist37.name, artist37.birth, artist37.death, artist37.link, artist37.information, artist37.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist thirty-eight.
        params = [artist38.artistId, artist38.name, artist38.birth, artist38.death, artist38.link, artist38.information, artist38.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist thirty-nine.
        params = [artist39.artistId, artist39.name, artist39.birth, artist39.death, artist39.link, artist39.information, artist39.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist forty.
        params = [artist40.artistId, artist40.name, artist40.birth, artist40.death, artist40.link, artist40.information, artist40.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-one.
        params = [artist41.artistId, artist41.name, artist41.birth, artist41.death, artist41.link, artist41.information, artist41.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-two.
        params = [artist42.artistId, artist42.name, artist42.birth, artist42.death, artist42.link, artist42.information, artist42.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-three.
        params = [artist43.artistId, artist43.name, artist43.birth, artist43.death, artist43.link, artist43.information, artist43.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-four.
        params = [artist44.artistId, artist44.name, artist44.birth, artist44.death, artist44.link, artist44.information, artist44.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-five.
        params = [artist45.artistId, artist45.name, artist45.birth, artist45.death, artist45.link, artist45.information, artist45.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-six.
        params = [artist46.artistId, artist46.name, artist46.birth, artist46.death, artist46.link, artist46.information, artist46.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-seven.
        params = [artist47.artistId, artist47.name, artist47.birth, artist47.death, artist47.link, artist47.information, artist47.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-eight.
        params = [artist48.artistId, artist48.name, artist48.birth, artist48.death, artist48.link, artist48.information, artist48.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist forty-nine.
        params = [artist49.artistId, artist49.name, artist49.birth, artist49.death, artist49.link, artist49.information, artist49.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty.
        params = [artist50.artistId, artist50.name, artist50.birth, artist50.death, artist50.link, artist50.information, artist50.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-one.
        params = [artist51.artistId, artist51.name, artist51.birth, artist51.death, artist51.link, artist51.information, artist51.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-two.
        params = [artist52.artistId, artist52.name, artist52.birth, artist52.death, artist52.link, artist52.information, artist52.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-three.
        params = [artist53.artistId, artist53.name, artist53.birth, artist53.death, artist53.link, artist53.information, artist53.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-four.
        params = [artist54.artistId, artist54.name, artist54.birth, artist54.death, artist54.link, artist54.information, artist54.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-five.
        params = [artist55.artistId, artist55.name, artist55.birth, artist55.death, artist55.link, artist55.information, artist55.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist fifty-six.
        params = [artist56.artistId, artist56.name, artist56.birth, artist56.death, artist56.link, artist56.information, artist56.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // artist fifty-seven.
        params = [artist57.artistId, artist57.name, artist57.birth, artist57.death, artist57.link, artist57.information, artist57.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-eight.
        params = [artist58.artistId, artist58.name, artist58.birth, artist58.death, artist58.link, artist58.information, artist58.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist fifty-nine.
        params = [artist59.artistId, artist59.name, artist59.birth, artist59.death, artist59.link, artist59.information, artist59.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });

        // artist sixty.
        params = [artist60.artistId, artist60.name, artist60.birth, artist60.death, artist60.link, artist60.information, artist60.about];
        db.run('INSERT INTO artist VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("A row has been inserted to the artist table...");
            }
        });
        // inserting values into the role table
        // role one.
        params = [role1.artistId, role1.movieId, role1.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role two.
        params = [role2.artistId, role2.movieId, role2.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role three.
        params = [role3.artistId, role3.movieId, role3.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role four.
        params = [role4.artistId, role4.movieId, role4.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role five.
        params = [role5.artistId, role5.movieId, role5.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role six.
        params = [role6.artistId, role6.movieId, role6.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role seven.
        params = [role7.artistId, role7.movieId, role7.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role eight.
        params = [role8.artistId, role8.movieId, role8.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role nine.
        params = [role9.artistId, role9.movieId, role9.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role ten.
        params = [role10.artistId, role10.movieId, role10.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role eleven.
        params = [role11.artistId, role11.movieId, role11.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twelve.
        params = [role12.artistId, role12.movieId, role12.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirteen.
        params = [role13.artistId, role13.movieId, role13.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fourteen.
        params = [role14.artistId, role14.movieId, role14.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifteen.
        params = [role15.artistId, role15.movieId, role15.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixteen.
        params = [role16.artistId, role16.movieId, role16.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role seventeen.
        params = [role17.artistId, role17.movieId, role17.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role eighteen.
        params = [role18.artistId, role18.movieId, role18.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role nineteen.
        params = [role19.artistId, role19.movieId, role19.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty.
        params = [role20.artistId, role20.movieId, role20.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-one.
        params = [role21.artistId, role21.movieId, role21.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-two.
        params = [role22.artistId, role22.movieId, role22.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-three.
        params = [role23.artistId, role23.movieId, role23.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-four.
        params = [role24.artistId, role24.movieId, role24.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-five.
        params = [role25.artistId, role25.movieId, role25.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-six.
        params = [role26.artistId, role26.movieId, role26.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-seven.
        params = [role27.artistId, role27.movieId, role27.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-eight.
        params = [role28.artistId, role28.movieId, role28.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role twenty-nine.
        params = [role29.artistId, role29.movieId, role29.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty.
        params = [role30.artistId, role30.movieId, role30.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-one.
        params = [role31.artistId, role31.movieId, role31.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-two.
        params = [role32.artistId, role32.movieId, role32.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-three.
        params = [role33.artistId, role33.movieId, role33.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-four.
        params = [role34.artistId, role34.movieId, role34.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-five.
        params = [role35.artistId, role35.movieId, role35.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-six.
        params = [role36.artistId, role36.movieId, role36.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-seven.
        params = [role37.artistId, role37.movieId, role37.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-eight.
        params = [role38.artistId, role38.movieId, role38.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role thirty-nine.
        params = [role39.artistId, role39.movieId, role39.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty.
        params = [role40.artistId, role40.movieId, role40.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-one.
        params = [role41.artistId, role41.movieId, role41.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-two.
        params = [role42.artistId, role42.movieId, role42.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-three.
        params = [role43.artistId, role43.movieId, role43.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-four.
        params = [role44.artistId, role44.movieId, role44.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-five.
        params = [role45.artistId, role45.movieId, role45.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-six.
        params = [role46.artistId, role46.movieId, role46.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-seven.
        params = [role47.artistId, role47.movieId, role47.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-eight.
        params = [role48.artistId, role48.movieId, role48.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role forty-nine.
        params = [role49.artistId, role49.movieId, role49.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty
        params = [role50.artistId, role50.movieId, role50.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-one.
        params = [role51.artistId, role51.movieId, role51.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-two.
        params = [role52.artistId, role52.movieId, role52.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-three.
        params = [role53.artistId, role53.movieId, role53.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-four.
        params = [role54.artistId, role54.movieId, role54.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-five.
        params = [role55.artistId, role55.movieId, role55.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-six.
        params = [role56.artistId, role56.movieId, role56.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-seven.
        params = [role57.artistId, role57.movieId, role57.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-eight.
        params = [role58.artistId, role58.movieId, role58.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role fifty-nine.
        params = [role59.artistId, role59.movieId, role59.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty.
        params = [role60.artistId, role60.movieId, role60.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-one.
        params = [role61.artistId, role61.movieId, role61.role];
        placeholders = '(' + params.map((param) => { return '?'; }).join(',') + ')';
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-two.
        params = [role62.artistId, role62.movieId, role62.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-three.
        params = [role63.artistId, role63.movieId, role63.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-four.
        params = [role64.artistId, role64.movieId, role64.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-five.
        params = [role65.artistId, role65.movieId, role65.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-six.
        params = [role66.artistId, role66.movieId, role66.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-seven.
        params = [role67.artistId, role67.movieId, role67.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-eight.
        params = [role68.artistId, role68.movieId, role68.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role sixty-nine.
        params = [role69.artistId, role69.movieId, role69.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role seventy.
        params = [role70.artistId, role70.movieId, role70.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role seventy-one
        params = [role71.artistId, role71.movieId, role71.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
        // role seventy-two.
        params = [role72.artistId, role72.movieId, role72.role];
        db.run('INSERT INTO role(artist_id, movie_id, role) VALUES' + placeholders, params, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`A row has been inserted to the role table...`);
            }
        });
    });
    // an example query:
    // const sql = `SELECT * FROM movie`;
    // db.get(sql, (err, row) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     return row ? console.log("row found") : console.log("not found");
    // });
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("database connection is closed...");
});

// the below tables were part of our initial schema where we divided the artist table into three tables
// but we did not have a role table. This way our schema was still not in 3nf. So we added a role table
// and got rid of these tables. I have put them at the end just for reference.
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