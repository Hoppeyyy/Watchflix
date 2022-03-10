const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = {
"Title":String,
"IMDB Score":Number,
"Genre":String,
"Poster":String,
"title":String,
"country":String,
"release_year":Number,
"duration":String,
"description":String
}

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie