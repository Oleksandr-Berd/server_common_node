const { model, Schema } = require("mongoose");

const schemaMovies = Schema({
  title:String,
  thumbnail: Object,
  year: Number,
  category: String,
  rating: String,
  isBookmarked: Boolean,
  isTrending: Boolean,
});

const Movies = model("movies", schemaMovies);

module.exports = {Movies};