const express = require("express");

const ctrlMarkdown = require("../../controllers/markdown/markdownCtrl");

const markdownRouter = express.Router();

markdownRouter.get("/all", ctrlMarkdown.getAll);
markdownRouter.get("/:name", ctrlMarkdown.getOne);
markdownRouter.post("/add", ctrlMarkdown.addNew);
markdownRouter.delete("/delete/:name", ctrlMarkdown.removeByName);

module.exports = markdownRouter;
