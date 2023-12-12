const { MarkdownModel } = require("../../models/index.js");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const result = await MarkdownModel.find({}, "");

  res.status(200).json(result);
};

const getOne = async (req, res) => {
  const { name } = req.params;

  const result = await MarkdownModel.find({ name: name }, "");

  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const newDoc = await MarkdownModel.create({ ...req.body });
console.log(newDoc);
  if (!newDoc) {
    throw HttpError(400, "Unable to save your data");
  }

  res.status(201).json({
    code: 201,
    message: "Successful success",
    data: { ...newDoc},
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
  addNew: ctrlWrapper(addNew),
};
