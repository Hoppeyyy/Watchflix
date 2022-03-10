const express = require ("express");
const router = express.Router();
const {getMovies} = require("../Controller/movieController");

router.get('/getmovies', getMovies)

module.exports = router;