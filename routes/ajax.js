const {getScheduleDate, getAllMovies} = require ('../controllers/queries');
const express = require('express');
const router  = express.Router();

// although express takes care of status codes efficiently, we have explicitly mentioned them just to be safe.
// this gives us all the timeslots of a movie (schedule API).
router.get('/timeslots', async (req, res) => {
    const movieID        = req.query.movieId;
    const schedule       = await getScheduleDate(movieID);
    const scheduleString = JSON.stringify(schedule).replace(/'/g, "\\'");
    res.status(200).json(JSON.parse(scheduleString));
});
// this is the movie API and is used for pagination.
router.get('/movies', async (req, res) => {
    const page         = parseInt(req.query.page) || 1; // if query not defined gives the first page by default.
    const pageSize     = parseInt(req.query.pageSize) || 10; // if query not defined gives 10 movies by page by default.
    const startIndex   = (page - 1) * pageSize;
    const movies       = (await getAllMovies()).slice(startIndex, startIndex+pageSize);
    const moviesString = JSON.stringify(movies).replace(/'/g, "\\'").replaceAll('\\"', '???');
    res.status(200).json(JSON.parse(moviesString));
});

module.exports = router;