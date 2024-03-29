const {db} = require('./db');

// Note that in all of the following functions by defining the inserted missing parameter independently,
// i.e. using the form => "query ..... ?", param
// we have prevented SQL injection.

// we have broken down the requests to very small (and somewhat similar) queries. So that as written
// in the lectures for each request we have several queries (as opposed to having one complex query for
// several requests which might break down and lead to loss of information).

// the reason for the long select, is that we used naming conventions in sql which is snake case
// and also for js variables it is camel case. Thus the names should be changed when using those variables in js.
const getMovieByID = async (id) => {
    try {
        const movie = new Promise((resolve, reject) => {
            db.get("SELECT movie_id AS movieID, title AS movieName, year AS movieYear, genre AS movieGenre, link AS movieLink, poster AS posterLink, trailer AS trailerLink, about AS movieAbout, plot AS moviePlot "
                + "FROM movie WHERE movie_id = ?;", [id], (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
        });
        return movie;
    } catch (error) {
        console.error(error);
        return;
    };
};

// getting all the artist who played in a specific movie.
const getArtistsByMovieID = async (id) => {
    try {
        const artists = new Promise((resolve, reject) => {
            db.all(
                "SELECT artist.artist_id AS artistID, "
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
                + "ON artist.artist_id = role.artist_id "
                + "WHERE movie_id = ?;"
                , [id], (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
        });
        return artists;
    } catch (error) {
        console.error(error);
        return;
    };
};

// getting all the movies for the main starting page.
const getAllMovies = async () => {
    try {
        const movieAll = new Promise((resolve, reject) => {
            db.all("SELECT movie_id AS movieID, title AS movieName, year AS movieYear "
                + "FROM movie;", (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });

        });
        return movieAll;
    } catch (error) {
        console.error(error);
        return;
    };
};

// getting the schedule of a movie.
const getScheduleDate = async (id) => {
    try {
        const schedule = new Promise((resolve, reject) => {
            db.all("SELECT * "
                 + "FROM schedule "
                 + "WHERE movie_id= ?;", [id], (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });

        });
        return schedule;
    } catch (error) {
        console.error(error);
        return;
    };
};

// getting the total number of orders.
const getNrOfOrders = async () => {
    try {
        const orderAll = new Promise((resolve, reject) => {
            db.get("SELECT COUNT(order_id) AS count "
                  + "FROM ordering;", (err, row) => {
                    if (err) reject(err);
                    resolve(row.count);
                });
        });
        return orderAll;
    } catch (error) {
        console.error(error);
        return;
    };
};

// getting the total number of users in total.
const getNrOfUsers = async () => {
    try {
        const userAll = new Promise((resolve, reject) => {
            db.get("SELECT COUNT(user_id) AS count "
                 + "FROM user;", (err, row) => {
                    if (err) reject(err);
                    resolve(row.count);
                });
        });
        return userAll;
    } catch (error) {
        console.error(error);
        return;
    };
};
// getting all the orders from a user.
const getOrdersByUser = async (id) => {
    try {
        const userOrders = new Promise((resolve, reject) => {
            db.all("SELECT date, num_of_tickets, title "
                 + "FROM (ordering JOIN movie ON "
                 + "ordering.movie_id = movie.movie_id) "
                 + "WHERE user_id = ?;", [id], (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
        });
        return userOrders;
    } catch (error) {
        console.error(error);
        return;
    };
};
// getting all the information of a user using their ID.
const getUserByID = (id) => {
    try {
        const user = new Promise((resolve, reject) => {
            db.get("SELECT * "
                + "FROM user WHERE user_id= ?", [id], (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
        });
        return user;
    } catch (error) {
        console.error(error);
        return;
    };
};
// getting all the users.
const getAllUsers = () => {
    try {
        const user = new Promise ((resolve, reject) => {
            db.all(`SELECT username, email, login FROM user`, (err, rows) => {
                if (err) reject (err);
                resolve(rows);
            });
        });
        return user;
    } catch (error) {
        console.error(error);
        return;
    };
};
module.exports = {
    getMovieByID,
    getArtistsByMovieID,
    getAllMovies,
    getScheduleDate,
    getNrOfOrders,
    getNrOfUsers,
    getOrdersByUser,
    getUserByID,
    getAllUsers
};

// The below queries were originally used. But we limited the number of querying
// in our dataset and handled the API in the front-end js to reduce the number of searching &
// accessing the dataset.
// move could have been done for example, getMovieByID() could have been replaced by using
// getAllMovies() and then getting the movie with the ID in the front-end. However, given
// the size of the database, we have written most of them as queries.

// // get a limited number of movies.
// const getMoviesByAmount = async (start, size) => {
//     try {
//         const movieAll = new Promise((resolve, reject) => {
//             db.all("SELECT movie_id AS movieID, title AS movieName, year AS movieYear "
//                 + "FROM movie LIMIT ? OFFSET ?;", [size, start], (err, rows) => {
//                     if (err) reject(err);
//                     resolve(rows);
//                 });
//         });
//         return movieAll;
//     } catch (error) {
//         console.error(error);
//         return;
//     };
// };

// // total number of orders from a user.
// const getNrOfOrdersByUser = async (id) => {
//     try {
//         const orderCount = new Promise((resolve, reject) => {
//             db.get("SELECT COUNT(order_id) AS count "
//                   + "FROM ordering WHERE user_id = ?;", [id], (err, row) => {
//                     if (err) reject(err);
//                     resolve(row.count);
//                 });
    
//         });
//         return orderCount;
//     } catch (error) {
//         console.error(error);
//         return;
//     };
// };