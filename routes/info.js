const express = require('express');
const router  = express.Router();
const {getScheduleDate, getMovieByID, getArtistsByMovieID} = require ('../controllers/queries');

router.get('/info', async (req, res) => {
    res.status(200).render('info');
});
router.get('/info-fetch', async (req, res) => {
    const movieID = req.query.id;
    const movie = await getMovieByID(movieID);
    const artists = await getArtistsByMovieID(movieID);
    const schedule = await getScheduleDate(movieID);
    res.status(200).json({ movie, artists, schedule });
});
module.exports = router;
