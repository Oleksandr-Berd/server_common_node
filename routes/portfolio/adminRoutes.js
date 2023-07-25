const express = require("express");

const ctrlAdmin = require("../../controllers/portfolio/adminControllers")

const adminPortfolioRoutes = express.Router()

adminPortfolioRoutes.post("/admin", ctrlAdmin.setAdmin)

adminPortfolioRoutes.post("/admin/login", ctrlAdmin.loginAdmin);


module.exports = adminPortfolioRoutes;