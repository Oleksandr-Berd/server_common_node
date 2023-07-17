const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar")

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

    const avatarUrl = gravatar.url(email)
    
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl});

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

  await User.findByIdAndUpdate(user._id, { token });

    const responseEmail = user.email;
    const responseName = user.name;
    
  res.json({ name:responseName, email:responseEmail, token });
};

const addBookmarked = async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body;
  const user = await User.findById(_id);

  const { bookmarked } = user;

  if (!bookmarked.includes(title)) {
    const addBookmark = await User.findByIdAndUpdate(_id, {
      bookmarked: [...bookmarked, title],
    });

    res.json(addBookmark);
  } else {
    const updateBookmarked = bookmarked.filter((el) => el !== title);

    const result = await User.findByIdAndUpdate(_id, {
      bookmarked: updateBookmarked,
    });
    res.json(result);
  }
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({ name, email });
};

const logout = async (req, res) => {

    const { _id } = req.user
    await User.findByIdAndUpdate(_id,{ token: "" })
    
    res.json({message: "Logout successful success"})
};

const updateAvatar = async (req, res) => {
const {_id} = req.user

const data = req.file.path;

    console.log("test", data);
    const result = await User.findByIdAndUpdate(_id, { avatarUrl: data })
    
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(201).json({avatarUrl})
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  addBookmarked: ctrlWrapper(addBookmarked),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
