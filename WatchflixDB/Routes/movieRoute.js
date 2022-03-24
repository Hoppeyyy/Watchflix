const express = require ("express");
const router = express.Router();
const {getMovies,findMovie} = require("../Controller/movieController");

router.get('/getmovies', getMovies)
router.get('/findmovie', findMovie)

module.exports = router;