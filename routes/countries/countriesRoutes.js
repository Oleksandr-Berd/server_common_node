const express = require("express");

const ctrlCountries = require('../../controllers/countries/countriesCtrl');

const countriesRouter = express.Router()

countriesRouter.get("/all", ctrlCountries.getAll)

module.exports = countriesRouter;