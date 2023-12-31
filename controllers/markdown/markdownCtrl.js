const { MarkdownModel } = require("../../models/index.js");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const allDocs = await MarkdownModel.find({}, "");
  const welcomeDoc = allDocs.filter(({ name }) => name === "welcome.md");

  const result = await MarkdownModel.find({}, "");

  const sortedResult = result.sort((a, b) => b.createdAt - a.createdAt);

  const uniquesResult = sortedResult.filter(
    ({ name }) => name !== "welcome.md"
  );

  res.status(200).json([welcomeDoc[0], ...uniquesResult]);
};

const getOne = async (req, res) => {
  const { name } = req.params;

  const result = await MarkdownModel.find({ name: name }, "");

  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const { name } = req.body;

  const isMatch = await MarkdownModel.find({ name: name }, "");

  if (isMatch.length) {
    throw HttpError(409, `The document with name ${name} already exists`);
  }
  const newDoc = await MarkdownModel.create({ ...req.body });
  if (!newDoc) {
    throw HttpError(400, "Unable to save your data");
  }

  res.status(201).json({
    code: 201,
    message: "Successful success",
    data: { ...newDoc },
  });
};

const removeByName = async (req, res) => {
  const { name } = req.params;

  const result = await MarkdownModel.findOneAndRemove({ name: name });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Delete is successful",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
  addNew: ctrlWrapper(addNew),
  removeByName: ctrlWrapper(removeByName),
};
