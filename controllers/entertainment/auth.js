const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("./../../utils/index");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    code: 201,
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.json({ token });
};

const addBookmarked = async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body;
    const user = await User.findById(_id);

    const {bookmarked} = user
    
    if (!bookmarked.includes(title)) {
        const addBookmark = await User.findByIdAndUpdate(_id, {
          bookmarked: [...bookmarked, title],
        });

        res.json(addBookmark);
    } else {
        const updateBookmarked = bookmarked.filter(el => el !== title)

        const result = await User.findByIdAndUpdate(_id, {
          bookmarked: updateBookmarked,
        });
         res.json(result);
    }

};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  addBookmarked: ctrlWrapper(addBookmarked),
};
