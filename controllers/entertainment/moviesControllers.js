const { Movies } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Movies.find({},"", {skip, limit});
  res.status(200).json(result);
};

const getTrending = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Movies.find({ isTrending: true }, "", { skip, limit });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({code: 200, result: result});
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const result = await Movies.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const movie = await Movies.create({ ...req.body });
  if (!movie) {
    res.status(400);
    throw new Error("Unable to save in a data base");
  }
  res
    .status(201)
    .json({ code: 201, message: "Successful success", data: movie });
};

const removeById = async (req, res) => {
  const { id } = req.params;

  const result = await Movies.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Delete is successful",
  });
};

const updateBookmarked = async (req, res) => {
  const { id } = req.params;
  const result = await Movies.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addImage = async (req, res) => {
  const { id } = req.params;

    const data = req.file.path
    
    const movieImage = await Movies.findByIdAndUpdate(id, {
      $set: { "thumbnail.regular.small": data },
    });

  if (!movieImage) {
    res.status(400);
    throw new Error("There is no movie with this id");
  }

  res.status(200).json({
    code: 200,
    message: "Successful success",
    data: movieImage,
  });
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  getTrending: ctrlWrapper(getTrending),
  getOneById: ctrlWrapper(getOneById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
    updateBookmarked: ctrlWrapper(updateBookmarked),
  addImage: ctrlWrapper(addImage)
};
