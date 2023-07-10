const { Movies } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const result = await Movies.find({});

  res.status(200).json(result);
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
    
    console.log("test".red, id);
     const result = await Movies.findByIdAndRemove(id);
     if (!result) {
       throw HttpError(404, "Not found");
     }
     res.status(200).json({
       message: "Delete is successful",
     });
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOneById: ctrlWrapper(getOneById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
};
