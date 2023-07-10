const express = require("express");
const ctrlMovies = require("./../../controllers/entertainment/moviesControllers");



const moviesRouter = express.Router();

moviesRouter.get("/movies", ctrlMovies.getAll)
moviesRouter.get("/movies/:id", ctrlMovies.getOneById);
moviesRouter.post("/movies", ctrlMovies.add);
moviesRouter.delete("/movies/:id", ctrlMovies.removeById);


module.exports = moviesRouter;