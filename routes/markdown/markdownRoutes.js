const express = require("express");

const ctrlMarkdown = require("../../controllers/markdown/markdownCtrl");
const { uploadCloud } = require("../../middleware/index");

const markdownRouter = express.Router();

markdownRouter.get("/all", ctrlMarkdown.getAll);
markdownRouter.get("/:name", ctrlMarkdown.getOne);

// markdownRouter.get("/:name", ctrlMarkdown.getOne);

module.exports = markdownRouter;
