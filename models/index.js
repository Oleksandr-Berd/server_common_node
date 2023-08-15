const { Movies } = require("./entertainment/movies");
const { User } = require("./entertainment/users");
const { Projects } = require("./portfolio/projects");
const { AdminPortfolio } = require("./portfolio/admin");
const {Countries} = require('./countries/countries');

module.exports = { Movies, User, Projects, AdminPortfolio, Countries };
