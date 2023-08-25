const { model, Schema } = require("mongoose");

const schemaGalleria = Schema({
  name: String,
  year: Number,
  description: String,
  source: String,
  artist: {
    image: String,
    name: String,
  },
  images: {
    thumbnail: String,
    hero: {
      small: String,
      large: String,
    },
    gallery: String,
  },
});

const GalleriaCollection = model("gallerias", schemaGalleria);

module.exports = { GalleriaCollection };
