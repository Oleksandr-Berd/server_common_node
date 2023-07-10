const { model, Schema } = require("mongoose");

const schemaMovies = Schema({
  thumbnail: {
    regular: {
      small: String,
      medium: String,
      large:String,
    },
    trending: {
      small: String,
      large: String,
    }
    
  },
  title: String,
  image: String,
  year: Number,
  category: String,
  rating: String,
  isBookmarked: Boolean,
  isTrending: Boolean,
});

const Movies = model("movies", schemaMovies);

module.exports = { Movies };
