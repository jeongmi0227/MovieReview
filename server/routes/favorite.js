const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
router.post('/favoriteNumber', (req, res) => {
    
    //retrieve favorite number from mongoDB 
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);
            // return favorite number
            res.status(200).json({ success: true, favoriteNumber: info.length });
    })
    
});

module.exports = router;