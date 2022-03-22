const Movie = require('../Models/movieModel')

const getMovies = (req, res)=>{

  Movie.find({},(err,movies)=>{
    res.json(movies)
  })
 
}

const findMovie = (req, res)=>{
  //console.log("query",req.query.id)
  Movie.findOne({_id:req.query.id},(err,movie)=>{
    if(err) return res.status(400).send("Requested movie not found")
      res.json(movie) 
      //console.log("returned movie", movie)
  })
}


module.exports = {
  getMovies,
  findMovie,
}