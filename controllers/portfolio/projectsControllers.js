const gravatar = require("gravatar");

const { Projects } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {};

const getAllByDifficulty = async (req, res) => {};

const getDetails = async (req, res) => {};

const addNew = async (req, res) => {

    const {title} = req.body
  const project = await Projects.create({ ...req.body });

  if (!project) {
    throw HttpError(400, "Unable to save your data");
  }

     const coverUrl = gravatar.url(title);
    
  res
    .status(201)
    .json({
      code: 201,
      message: "Successful success",
      data: { ...project, coverImage: coverUrl },
    });
};

const updateOne = async (req, res) => {};

const removeOne = async (req, res) => {};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getAllByDifficulty: ctrlWrapper(getAllByDifficulty),
  getDetails: ctrlWrapper(getDetails),
  addNew: ctrlWrapper(addNew),
  updateOne: ctrlWrapper(updateOne),
  removeOne: ctrlWrapper(removeOne),
};
