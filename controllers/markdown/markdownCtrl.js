const { MarkdownModel } = require("../../models/index.js"); 

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {

    console.log(MarkdownModel);
  const result = await MarkdownModel.find({}, "");

    
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
