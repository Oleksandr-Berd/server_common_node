const { GalleriaCollection } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
    const result = await GalleriaCollection.find({}, "");

  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const result = await GalleriaCollection.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const addImage = async (req, res) => {
  const { id } = req.params;

  const data = req.file.path;

  const movieImage = await GalleriaCollection.findByIdAndUpdate(id, {
    $set: { "images.hero.large": data },
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
  addImage: ctrlWrapper(addImage),
  getOneById: ctrlWrapper(getOneById),
};
