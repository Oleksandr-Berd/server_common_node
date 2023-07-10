const express = require("express");
const ctrlMovies = require("./../../controllers/entertainment/moviesControllers")



const moviesRouter = express.Router();

moviesRouter.get("/movies", ctrlMovies.getAll)

module.exports = moviesRouter;