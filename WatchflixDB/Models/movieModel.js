const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  "FIELD1":String,
  "Genre":String,
  "IMDB Score":Number,
  "Imdb Link":String,
  "Poster":String,
  "Title":String,
  "cast":String,
  "country":String,
  "data_added":String,
  "description":String,
  "director":String,
  "duration":String,
  "imdbId":Number,
  "listed_in":String,
  "month_added":Number,
  "rating":String,
  "release_year":Number,
  "season_count":Number,
  "show_id":String,
  "title":String,
  "type":String,
  "year_added":Number,
  "stickers":[{type:mongoose.Schema.ObjectId, ref:"Uuid"}],
  "reviews":[{type:mongoose.Schema.ObjectId, ref:"Uuid"}]
})


const Movie = mongoose.model("Movie", MovieSchema);



module.exports = Movie