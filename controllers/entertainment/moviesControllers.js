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
module.exports = {
  getAll: ctrlWrapper(getAll),
  getOneById: ctrlWrapper(getOneById),
};
