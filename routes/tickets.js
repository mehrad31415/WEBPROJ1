const express = require('express');
const router  = express.Router();
const {getScheduleDate, getMovieByID, getAllMovies, getNrOfOrders} = require ('../controllers/queries');
router.get('/tickets', async (req, res) => {
    res.status(200).render('tickets');
});
router.get('/tickets-fetch', async (req, res) => {
    const allMovies = await getAllMovies();
    const movieID = req.query.id;
    const date = req.query.date;
    const time = req.query.time;
    let amount = null;
    if (req.query.amount) amount = req.query.amount;
    const movie = await getMovieByID(movieID);
    const schedule = await getScheduleDate(movieID);
    const orderAll = await getNrOfOrders();
    res.status(200).json({ allMovies, movie, schedule, orderAll, date, time, amount});
});

module.exports = router;