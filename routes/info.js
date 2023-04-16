const express = require('express');
const router  = express.Router();
const {getScheduleDate, getMovieByID, getArtistsByMovieID} = require ('../controllers/queries');

// this is the info page of a movie.
router.get('/', async (req, res) => {
    if (! req.query.id ){
        res.redirect('/info?id=0'); // if no query is defined, by default give the information of the 12 angry men (for marketing purposes).
    } else {
        res.status(200).render('info');
    }
});

// this is the information API of a movie.
// The API gives a information about the movie itself, its artists, and the schedules the movie is offered.
router.get('/fetch', async (req, res) => {
    const movieID  = req.query.id;
    const movie    = await getMovieByID(movieID);
    const artists  = await getArtistsByMovieID(movieID);
    const schedule = await getScheduleDate(movieID);
    res.status(200).json({ movie, artists, schedule });
});
module.exports = router;
