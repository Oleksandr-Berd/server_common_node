const express = require("express");
const ctrlMovies = require("./../../controllers/entertainment/moviesControllers");
const {uploadCloud} = require("../../middleware/index")



const moviesRouter = express.Router();

moviesRouter.get("/movies", ctrlMovies.getAll)
moviesRouter.get("/movies/trending", ctrlMovies.getTrending);
moviesRouter.get("/movies/:id", ctrlMovies.getOneById);
moviesRouter.get("/movies/trending", ctrlMovies.getOneById);
moviesRouter.post("/movies", ctrlMovies.add);
moviesRouter.delete("/movies/:id", ctrlMovies.removeById);
moviesRouter.patch("/movies/:id/bookmarked", ctrlMovies.updateBookmarked);
moviesRouter.patch(
  "/movies/:id/image",
  uploadCloud.single("image"),
  ctrlMovies.addImage
);



module.exports = moviesRouter;