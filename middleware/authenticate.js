const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { HttpError } = require("../utils");
const { AdminPortfolio } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id, email } = jwt.verify(token, SECRET_KEY);

    const user = id ? await User.findById(id) : await User.findOne({ email });

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

const authenticateAdmin = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id, email } = jwt.verify(token, SECRET_KEY);
    const admin = id
      ? await AdminPortfolio.findById(id)
      : await AdminPortfolio.findOne({ email });

    if (!admin || !admin.token || admin.token !== token) {
      next(HttpError(401));
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = { authenticate, authenticateAdmin };
