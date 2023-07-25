const express = require("express")

const { validateBody, authenticate, uploadCloud } = require("../../middleware");
const ctrlProjects = require("./../../controllers/portfolio/projectsControllers");

const { schemas } = require("../../models/portfolio/projects");

const projectsRoutes = express.Router();

projectsRoutes.post(
  "/projects",
  validateBody(schemas.projectPostSchema),  
  ctrlProjects.addNew
);

module.exports = projectsRoutes;