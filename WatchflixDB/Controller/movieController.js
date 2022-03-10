const Movie = require('../Models/movieModel')

const getMovies = (req, res)=>{

  Movie.find({},(err,movies)=>{
    res.json(movies)
  })
}

module.exports = {
  getMovies
}