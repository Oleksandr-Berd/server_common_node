const jwt = require("jsonwebtoken");

const { User } = require("../models");
const {HttpError} = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
      const { id, email } = jwt.verify(token, SECRET_KEY);
      
     const user =
       !!id
         ? await User.findById(id)
             : await User.findOne({ email });
      console.log(
        "user:",
        user,
        "user.token: ",
        user.token,
        "user.token !== token",
        user.token !== token
      );
    if (!user || !user.token || user.token !== token) {
          next(HttpError(401));
    }
req.user = user
      next()
  } catch (error) {
    next(HttpError(401));
    
  }
};

module.exports = authenticate;
