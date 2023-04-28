# WEBPROJ
This project is for the "Web Technology" course at Utrecht University.
# Group ID
Group ID = G15
# Group Names
Erik van Riel (5522404)
Lars van den Bogaert (0744670)
Mehrad Haghshenas (2822865)

# Link to Website 
http://webtech.science.uu.nl/group15

# brief explanation of our web-site
### Database
The database can be mainly found in the 'models' folder. This directory contains the schema.js file where the tables are created & the data is inserted to these tables (in other words the schema.js file contains the DDL of the database). As shown above, the database has 6 tables, and is in forth normal form. Accordingly, the 'models' folder contains three folders in total: 
- schema_model: The visual schema design of the database can be found in this directory. 
- database: where the database file (movie.db) is stored. 
- tables: this directory consists of six directories each for one table of the database. Inside each of these directories resides files containing the predefined data including the movie names, artist names, roles, schedules .... etc.

### Back-end
The back-end consists of four main parts:
- package.json: this file includes the configuration of the project. Specifically, the dependencies installed from npm are: "cookie-parser" & "express-session" (for sessions and cookies), "ejs" (for template engines), "express", "morgan" (for logger), "sqlite3" (for database), and "nodemon" (for development).
- controllers: This folder consists of two files: 1 - db.js: this file opens the database when the server is on (listening). The goal is that when a user inputs data, the database is open for the data to be inserted. Moreover, the database is closed once the server is down (this is written in the last line(s) of app.js). 2 - queries.js: this consists of the query functions on the database. For example, getting all the movies, or all the users. In short, we reduced the number of queries on the database so that the database is not accessed every time data is needed (more information can be found in the comments of this file).
- routes: this folder consists of the routers of the website. Each have different business logic written in different files.
- app.js: this is the main file that runs the server. 

### Front-end
- For the user/login system we used buttons at the right bottom of the page. When you are not logged in, there wil be two buttons: one to log in and one to sign in/create an account. when logging in there will be a pop-up to enter your login and password. These data are then compared with the database using fetch. When clicking sign-in there will be a page where you can enter the required data. On submit, these data are compared to the database to see if there are conflicts with uniqueness. If you are logged in, there will be two different buttons: one for logging out and one to go to your account-page. Logging out will destroy the session and the "my-account" button directs to the account page.
- The homepage consists of buttons with movie names in them. There are 10 displayed, and when scrolling to the bottom, ten more will be loaded using AJAX. (if there are more movies in the database, the scrolling down and loading movies can continue, until all movies are displayed -- progressive pagination).
- When clicking a movie, you will be redirected to the info-page of the movie (except for the angry-men movie). We chose this option because we wanted to implement our previous work; thus, you will be redirected to the main-page of project 2 for 12 angry men. If you then click on info you will be redirected to the corresponding info-page
- At the info page, the same information is shown as in project two, but now the information comes from the database, using fetch.
- When logged in: At the top of every info-page, there are buttons with time slots. When clicking a time slot, you will be send to the purchase page where you can enter an amount of tickets and click the purchase button, which will give you an confirmation window. In this window you can change your order and confirm, the time slots received through AJAX, the movies through fetch. On confirm the order is added to your account.
- If you do not confirm but leave the page, a third button will be shown at the bottom right: the "unfinished order" button. When clicking this, all your unfinished orders will be shown, and you can go back to them or delete them.
- An AU (anonymous user) cannot purchase any movie-tickets, but can see the information related to all movies.
  
# Logins & Passwords
# 1
Login = stijn123
Password = Stijn321
# 2
Login = rick123
Password = Rick4321
# 3
Login = niels123
Password = Niels321
# 4
Login = kevin123
Password = Kevin321
# 5 
Login = nick123
Password = Nick4321

# SQL definition of your database

CREATE TABLE IF NOT EXISTS movie (
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
)
CREATE TABLE IF NOT EXISTS schedule(
    schedule_id INTEGER PRIMARY KEY,
    movie_id    INTEGER NOT NULL   ,
    date        TEXT    NOT NULL   ,
    /* constraints */
    FOREIGN KEY (movie_id) REFERENCES movie (movie_id) ON UPDATE CASCADE ON DELETE CASCADE
)
CREATE TABLE IF NOT EXISTS user (
    user_id          INTEGER        PRIMARY KEY     ,
    username         VARCHAR(255)   NOT NULL UNIQUE ,
    email            VARCHAR(255)   NOT NULL UNIQUE ,
    login            VARCHAR(255)   NOT NULL UNIQUE ,
    password         VARCHAR(255)   NOT NULL        ,
    address          VARCHAR(255)                   ,
    credit_card      CHAR(18)       NOT NULL        ,
    registered_date  TEXT           NOT NULL
)
CREATE TABLE IF NOT EXISTS ordering (
    order_id       INTEGER PRIMARY KEY                ,
    user_id        INTEGER NOT NULL                   ,
    movie_id       INTEGER NOT NULL                   ,
    date           TEXT    NOT NULL                   ,
    num_of_tickets INTEGER NOT NULL                   ,
    /* constraints */
    FOREIGN KEY (user_id)  REFERENCES user(user_id)   ON UPDATE CASCADE ON DELETE CASCADE ,
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON UPDATE CASCADE ON DELETE CASCADE
)
CREATE TABLE IF NOT EXISTS artist (
    artist_id   INTEGER        PRIMARY KEY      ,
    name        VARCHAR(255)   NOT NULL         ,
    birth       CHAR(4)                         ,
    death       CHAR(4)                         ,
    link        VARCHAR(255)   NOT NULL UNIQUE  ,
    information VARCHAR(255)   NOT NULL UNIQUE  ,
    about       TEXT           NOT NULL         
)
CREATE TABLE IF NOT EXISTS role (
    role_id   INTEGER           PRIMARY KEY AUTOINCREMENT  ,
    artist_id INTEGER           NOT NULL                   ,
    movie_id  INTEGER           NOT NULL                   ,
    role      VARCHAR (255)     NOT NULL                   ,
    /* constraints */
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    FOREIGN KEY (movie_id)  REFERENCES movie (movie_id)  ON DELETE CASCADE ON UPDATE CASCADE
)

# Structure of the application

.
├── README.md
├── app.js
├── controllers
│   ├── db.js
│   └── queries.js
├── models
│   ├── database
│   │   └── movie.db
│   ├── schema.js
│   ├── schema_model
│   │   ├── model.mwb
│   │   └── model.png
│   └── tables
│       ├── artists
│       │   ├── angryMen
│       │   │   ├── actors
│       │   │   │   ├── JohnFiedler.js
│       │   │   │   ├── LeeJCobb.js
│       │   │   │   ├── eGMarshall.js
│       │   │   │   ├── edBegley.js
│       │   │   │   ├── edwardBinns.js
│       │   │   │   ├── georgeVoskovec.js
│       │   │   │   ├── henryFonda.js
│       │   │   │   ├── jackKlugman.js
│       │   │   │   ├── jackWarden.js
│       │   │   │   ├── josephSweeney.js
│       │   │   │   ├── martinBalsam.js
│       │   │   │   ├── robertWebber.js
│       │   │   │   └── rudyBond.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── blackfish
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── bladeRunner
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── dragonTatoo
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── godFather
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── hangover
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── indianaJones
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── laLaLand
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── lordRings
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── notebook
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── privateRyan
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── rocky
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── schindlerList
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── shawshankRedemption
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── shining
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── silenceLambs
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── terminator
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── theoryOfEverything
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   ├── toyStory
│       │   │   ├── actor.js
│       │   │   ├── director.js
│       │   │   └── writer.js
│       │   └── unforgiven
│       │       ├── actor.js
│       │       ├── director.js
│       │       └── writer.js
│       ├── movies
│       │   ├── 12AngryMen.js
│       │   ├── blackfish.js
│       │   ├── bladeRunner.js
│       │   ├── dragonTatoo.js
│       │   ├── godfather.js
│       │   ├── hangover.js
│       │   ├── indianaJones.js
│       │   ├── laLaLand.js
│       │   ├── lordOfTheRings.js
│       │   ├── notebook.js
│       │   ├── privateRyan.js
│       │   ├── rocky.js
│       │   ├── schindlerList.js
│       │   ├── shawshankRedemption.js
│       │   ├── shining.js
│       │   ├── silenceLambs.js
│       │   ├── terminator.js
│       │   ├── theoryOfEverything.js
│       │   ├── toyStory.js
│       │   └── unforgiven.js
│       ├── orders
│       │   ├── orderEight.js
│       │   ├── orderFive.js
│       │   ├── orderFour.js
│       │   ├── orderNine.js
│       │   ├── orderOne.js
│       │   ├── orderSeven.js
│       │   ├── orderSix.js
│       │   ├── orderTen.js
│       │   ├── orderThree.js
│       │   └── orderTwo.js
│       ├── role
│       │   ├── role01.js
│       │   ├── role02.js
│       │   ├── role03.js
│       │   ├── role04.js
│       │   ├── role05.js
│       │   ├── role06.js
│       │   ├── role07.js
│       │   ├── role08.js
│       │   ├── role09.js
│       │   ├── role10.js
│       │   ├── role11.js
│       │   ├── role12.js
│       │   ├── role13.js
│       │   ├── role14.js
│       │   ├── role15.js
│       │   ├── role16.js
│       │   ├── role17.js
│       │   ├── role18.js
│       │   ├── role19.js
│       │   ├── role20.js
│       │   ├── role21.js
│       │   ├── role22.js
│       │   ├── role23.js
│       │   ├── role24.js
│       │   ├── role25.js
│       │   ├── role26.js
│       │   ├── role27.js
│       │   ├── role28.js
│       │   ├── role29.js
│       │   ├── role30.js
│       │   ├── role31.js
│       │   ├── role32.js
│       │   ├── role33.js
│       │   ├── role34.js
│       │   ├── role35.js
│       │   ├── role36.js
│       │   ├── role37.js
│       │   ├── role38.js
│       │   ├── role39.js
│       │   ├── role40.js
│       │   ├── role41.js
│       │   ├── role42.js
│       │   ├── role43.js
│       │   ├── role44.js
│       │   ├── role45.js
│       │   ├── role46.js
│       │   ├── role47.js
│       │   ├── role48.js
│       │   ├── role49.js
│       │   ├── role50.js
│       │   ├── role51.js
│       │   ├── role52.js
│       │   ├── role53.js
│       │   ├── role54.js
│       │   ├── role55.js
│       │   ├── role56.js
│       │   ├── role57.js
│       │   ├── role58.js
│       │   ├── role59.js
│       │   ├── role60.js
│       │   ├── role61.js
│       │   ├── role62.js
│       │   ├── role63.js
│       │   ├── role64.js
│       │   ├── role65.js
│       │   ├── role66.js
│       │   ├── role67.js
│       │   ├── role68.js
│       │   ├── role69.js
│       │   ├── role70.js
│       │   ├── role71.js
│       │   └── role72.js
│       ├── schedule
│       │   ├── schedule1.js
│       │   ├── schedule10.js
│       │   ├── schedule11.js
│       │   ├── schedule12.js
│       │   ├── schedule13.js
│       │   ├── schedule14.js
│       │   ├── schedule15.js
│       │   ├── schedule16.js
│       │   ├── schedule17.js
│       │   ├── schedule18.js
│       │   ├── schedule19.js
│       │   ├── schedule2.js
│       │   ├── schedule20.js
│       │   ├── schedule21.js
│       │   ├── schedule22.js
│       │   ├── schedule23.js
│       │   ├── schedule24.js
│       │   ├── schedule25.js
│       │   ├── schedule26.js
│       │   ├── schedule27.js
│       │   ├── schedule28.js
│       │   ├── schedule29.js
│       │   ├── schedule3.js
│       │   ├── schedule30.js
│       │   ├── schedule31.js
│       │   ├── schedule32.js
│       │   ├── schedule33.js
│       │   ├── schedule34.js
│       │   ├── schedule4.js
│       │   ├── schedule5.js
│       │   ├── schedule6.js
│       │   ├── schedule7.js
│       │   ├── schedule8.js
│       │   └── schedule9.js
│       └── users
│           ├── userFive.js
│           ├── userFour.js
│           ├── userOne.js
│           ├── userThree.js
│           └── userTwo.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   ├── files
│   │   ├── documents
│   │   │   └── 12-angry-men-script.pdf
│   │   ├── icon
│   │   │   └── icon.ico
│   │   └── images
│   │       ├── anthony_hopkins.jpg
│   │       ├── anthony_mccarten.jpg
│   │       ├── arnold_schwarzenegger.jpg
│   │       ├── bradley_cooper.jpg
│   │       ├── clint_eastwood.jpg
│   │       ├── damien_chazelle.jpg
│   │       ├── daniel_craig.jpg
│   │       ├── david_fincher.jpg
│   │       ├── david_webb_peoples.jpg
│   │       ├── denis_villeneuve.jpg
│   │       ├── e_g_marshall.jpg
│   │       ├── ed_begley.jpg
│   │       ├── eddie_redmayne.jpg
│   │       ├── edward_binns.jpg
│   │       ├── elijah_wood.jpg
│   │       ├── emma_stone.jpg
│   │       ├── film-frame.png
│   │       ├── francis_ford_coppola.jpg
│   │       ├── frank_darabont.jpg
│   │       ├── gabriela_cowperthwaite.jpg
│   │       ├── george_lucas.jpg
│   │       ├── george_voskovec.jpg
│   │       ├── harrison_ford.jpg
│   │       ├── henry_fonda.jpg
│   │       ├── jack_klugman.jpg
│   │       ├── jack_nicholson.jpg
│   │       ├── jack_warden.jpg
│   │       ├── james_cameron.jpg
│   │       ├── james_marsh.jpg
│   │       ├── john_fiedler.jpg
│   │       ├── john_fiedler.png
│   │       ├── john_g_avildsen.jpg
│   │       ├── john_lasseter.jpg
│   │       ├── jon_lucas.jpg
│   │       ├── jonathan_demme.jpg
│   │       ├── joseph_sweeney.jpg
│   │       ├── jrr_tolkien.jpg
│   │       ├── lee_j_cobb.jpg
│   │       ├── liam_neeson.jpg
│   │       ├── mario_puzo.jpg
│   │       ├── marlon_brando.jpg
│   │       ├── martin_balsam.jpg
│   │       ├── nicholas_sparks.jpg
│   │       ├── nick_cassavetes.jpg
│   │       ├── peter_jackson.jpg
│   │       ├── rachel_mcadams.jpg
│   │       ├── reginald_rose.jpg
│   │       ├── robert_rodat.jpg
│   │       ├── robert_webber.jpg
│   │       ├── rudy_bond.jpg
│   │       ├── ryan_gosling.jpg
│   │       ├── sidney_lumet.jpg
│   │       ├── stanley_kubrick.jpg
│   │       ├── stephen_king.jpg
│   │       ├── steven_spielberg.jpg
│   │       ├── stieg_larsson.jpg
│   │       ├── sylvester_stallone.jpg
│   │       ├── thomas_harris.jpg
│   │       ├── thomas_keneally.jpg
│   │       ├── tim_robbins.jpg
│   │       ├── todd_phillips.jpg
│   │       └── tom_hanks.jpg
│   └── scripts
│       ├── scriptAccount.js
│       ├── scriptAll.js
│       ├── scriptAngryMen.js
│       ├── scriptCast.js
│       ├── scriptInfoClasses.js
│       ├── scriptMovieInfo.js
│       ├── scriptOrdersUnf.js
│       ├── scriptPagination.js
│       ├── scriptSignUp.js
│       ├── scriptTickets.js
│       └── scriptTooltip.js
├── routes
│   ├── ajax.js
│   ├── angry-men.js
│   ├── info.js
│   ├── login.js
│   └── tickets.js
└── views
    ├── account.ejs
    ├── angry-men-adaptations.ejs
    ├── angry-men-awards.ejs
    ├── angry-men-cast.ejs
    ├── angry-men-reviews.ejs
    ├── angry-men-transcripts.ejs
    ├── angry-men.ejs
    ├── contact.ejs
    ├── incorrect-user-pass.ejs
    ├── index.ejs
    ├── info.ejs
    ├── order-unf.ejs
    ├── partials
    │   ├── footer.ejs
    │   └── header.ejs
    ├── resource-not-found.ejs
    ├── sign-in.ejs
    └── tickets.ejs

43 directories, 321 files
