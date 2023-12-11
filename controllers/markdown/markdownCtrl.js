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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
};
