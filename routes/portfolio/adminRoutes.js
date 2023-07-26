const express = require("express");

const ctrlAdmin = require("../../controllers/portfolio/adminControllers");
const { authenticateAdmin } = require("../../middleware");

const adminPortfolioRoutes = express.Router()

adminPortfolioRoutes.post("/admin", ctrlAdmin.setAdmin)

adminPortfolioRoutes.post("/admin/login", ctrlAdmin.loginAdmin);

adminPortfolioRoutes.get("/admin/current", authenticateAdmin, ctrlAdmin.refreshAdmin);

adminPortfolioRoutes.post(
  "/admin/logout",
  authenticateAdmin,
  ctrlAdmin.logoutAdmin
);




module.exports = adminPortfolioRoutes;