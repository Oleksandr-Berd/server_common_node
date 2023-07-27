const gravatar = require("gravatar");

const { Projects } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {};

const getAllByDifficulty = async (req, res) => {};

const getDetails = async (req, res) => {};

const addNew = async (req, res) => {

  const project = await Projects.create({ ...req.body });

  if (!project) {
    throw HttpError(400, "Unable to save your data");
  }

    
  res
    .status(201)
    .json({
      code: 201,
      message: "Successful success",
      data: { ...project, coverImage: coverUrl },
    });
};

const updateOne = async (req, res) => { };

const updateCover = async (req, res) => {
const {title} = req.body
  
  const data = req.file.path;

  const result = await Projects.findOneAndUpdate({ title }, {coverImage: data})

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

const removeOne = async (req, res) => {};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getAllByDifficulty: ctrlWrapper(getAllByDifficulty),
  getDetails: ctrlWrapper(getDetails),
  addNew: ctrlWrapper(addNew),
  updateOne: ctrlWrapper(updateOne),
  removeOne: ctrlWrapper(removeOne),
  updateCover: ctrlWrapper(updateCover),
};
