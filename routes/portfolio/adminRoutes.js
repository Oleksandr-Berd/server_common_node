const express = require("express");

const ctrlAdmin = require("../../controllers/portfolio/adminControllers")

const adminPortfolioRoutes = express.Router()

adminPortfolioRoutes.post("/admin", ctrlAdmin.setAdmin)

module.exports = adminPortfolioRoutes;