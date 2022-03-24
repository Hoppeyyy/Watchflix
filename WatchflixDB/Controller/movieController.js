const Movie = require('../Models/movieModel')

// problem will ocuur in Heroku due to limited data
const getMovies = (req, res)=>{

  Movie.find({},(err,movies)=>{
    res.json(movies)
  })
 
}

const findMovie = (req, res)=>{
  Movie.findOne({_id:req.query.id},(err,movie)=>{
    if(err) return res.status(400).send("Requested movie not found")
      res.json(movie) 
    
  })
}


module.exports = {
  getMovies,
  findMovie,
}