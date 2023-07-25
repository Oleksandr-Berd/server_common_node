const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AdminPortfolio } = require("../../models/index");

const { SECRET_KEY } = process.env;

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const setAdmin = async (req, res) => {
    const { name, email, password } = req.body;
console.log(AdminPortfolio);
  const hashPassword = await bcrypt.hash(password, 10);

const payload = {
  email: email,
};
  const token = jwt.sign(payload ,SECRET_KEY, { expiresIn: "24h" });
    
  const admin = await AdminPortfolio.create({
    ...req.body,
    password: hashPassword,
    token,
  });

  res.status(201).json({
    code: 201,
    email: admin.email,
    name: admin.name,
    token: admin.token,
  });

   

};

const loginAdmin = async (req, res) => {};

const updateAdmin = async (req, res) => {};

const refreshAdmin = async (req, res) => {};


module.exports = {
  setAdmin: ctrlWrapper(setAdmin),
  loginAdmin: ctrlWrapper(loginAdmin),
  updateAdmin: ctrlWrapper(updateAdmin),
  refreshAdmin: ctrlWrapper(refreshAdmin),
};