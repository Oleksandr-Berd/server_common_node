const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AdminPortfolio } = require("../../models/index");

const { SECRET_KEY } = process.env;

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const setAdmin = async (req, res) => {
    const { name, email, password } = req.body;
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

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await AdminPortfolio.findOne({ email });
    if (!admin) {
      throw HttpError(401, "Email or password is invalid");
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password is invalid");
    }

    const payload = {
      id: admin._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    await AdminPortfolio.findByIdAndUpdate(admin._id, { token });

    const responseEmail = admin.email;
    const responseName = admin.name;

    res.json({
      name: responseName,
      email: responseEmail,
      token,
    });
};

const updateAdmin = async (req, res) => {};

const refreshAdmin = async (req, res) => {
    const { email, name } = req.admin;

    res.json({ name, email });
};

const logoutAdmin = async (req, res) => {
   const { _id } = req.admin;

   await AdminPortfolio.findByIdAndUpdate(_id, { token: "" });

   res.json({ message: "Logout successful success" });
}


module.exports = {
  setAdmin: ctrlWrapper(setAdmin),
  loginAdmin: ctrlWrapper(loginAdmin),
  updateAdmin: ctrlWrapper(updateAdmin),
  refreshAdmin: ctrlWrapper(refreshAdmin),
  logoutAdmin: ctrlWrapper(logoutAdmin)
};