const fs = require('node:fs');

// if database does not exist, create a new one with write option.
const file    = "./models/database/movie.db";
const exists  = fs.existsSync(file);
if (! exists) {
    fs.openSync(file, "w");
};

// connection to the database.
const sqlite3 = require("sqlite3").verbose();
const db      = new sqlite3.Database(file, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Database is open...");
    }
});

module.exports = {db};