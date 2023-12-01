const { QuizCollection } = require("../../models/index");
const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const result = await QuizCollection.find({}, "");

  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const result = await QuizCollection.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateIcon = async (req, res) => {
  const { title } = req.body;

  const data = req.file.path;

  const result = await QuizCollection.findOneAndUpdate({ title }, { icon: data });
  
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOneById: ctrlWrapper(getOneById),
  updateIcon: ctrlWrapper(updateIcon),
};
