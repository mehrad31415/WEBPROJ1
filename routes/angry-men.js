const {getArtistsByMovieID} = require('../controllers/queries');
// 12 angry men router.
const express = require('express');
const router  = express.Router();
// home page of 12 angry men.
router.get('/', (req, res) => {
    res.status(200).render('angry-men');
});
// for the sub directories (awards, adaptations...), we have used a route parameter.
// although express takes care of status codes efficiently, we have explicitly mentioned them just to be safe.
// also at the end of each case the 'break' is just for safety and theoretically no url should go into two case options.
router.get('/:p', async (req,res) => {
    const {p} = req.params;
    switch (p) {
        case 'adaptations':
            res.status(200).render('angry-men-adaptations');
            break;
        case 'awards':
            res.status(200).render('angry-men-awards');
            break;
        case 'cast':
            const artists = await getArtistsByMovieID(0);
            res.status(200).render('angry-men-cast', {
                ejsArtists: JSON.stringify(artists).replace(/'/g, "\\'").replaceAll('\\"', '???').replaceAll('\\n', '@@@').replaceAll(/\[1\]|\[2\]|\[3\]|\[4\]|\[5\]|\[6\]|\[7\]|\[8\]|\[9\]/g, '')
            });
            break;
        case 'reviews':
            res.status(200).render('angry-men-reviews');
            break;
        case 'transcripts':
            res.status(200).render('angry-men-transcripts');
            break;
        default:
            res.status(404).render('resource-not-found', {resource : req.url})
            break;
    };
});
module.exports = router;