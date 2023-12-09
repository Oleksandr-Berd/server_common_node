const { Movies } = require("./entertainment/movies");
const { User } = require("./entertainment/users");
const { Projects } = require("./portfolio/projects");
const { AdminPortfolio } = require("./portfolio/admin");
const { Countries } = require('./countries/countries');
const { GalleriaCollection } = require("./galleria/galleria");
const { QuizCollection } = require("./quize/quize")
const { MarkdownModel } = require("./markdown/markdown");

module.exports = {
  Movies,
  User,
  Projects,
  AdminPortfolio,
  Countries,
  GalleriaCollection,
  QuizCollection,
  MarkdownModel,
};
