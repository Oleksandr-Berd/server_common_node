const express = require("express");

const {
  validateBody,
  authenticate,
  uploadCloud,
  authenticateAdmin,
} = require("../../middleware");
const ctrlProjects = require("./../../controllers/portfolio/projectsControllers");

const { schemas } = require("../../models/portfolio/projects");

const projectsRoutes = express.Router();

projectsRoutes.get("/projects", ctrlProjects.getAll);

projectsRoutes.get("/projects/:title", ctrlProjects.getDetails);


projectsRoutes.post(
  "/projects",
  validateBody(schemas.projectPostSchema),
  ctrlProjects.addNew
);

projectsRoutes.patch(
  "/projects/cover",
  uploadCloud.single("coverImage"),
  ctrlProjects.updateCover
);

projectsRoutes.patch(
  "/projects/preview",
  uploadCloud.single("preview"),
  ctrlProjects.updatePreview
);

module.exports = projectsRoutes;
