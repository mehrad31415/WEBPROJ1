const {getScheduleDate, getMoviesByAmount} = require ('../controllers/queries');
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

router.get('/movies', async (req, res) => {
    const page         = parseInt(req.query.page) || 1;
    const pageSize     = parseInt(req.query.pageSize) || 10;
    const startIndex   = (page - 1) * pageSize;
    const movies       = await getMoviesByAmount(startIndex, pageSize);
    const moviesString = JSON.stringify(movies).replace(/'/g, "\\'").replaceAll('\\"', '???');
    res.status(200).json(JSON.parse(moviesString));
});

module.exports = router;