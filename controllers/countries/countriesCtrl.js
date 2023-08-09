const { Countries } = require("../../models/index")

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

    const result = await Countries.find({}, "", { skip, limit });
    
  res.status(200).json(result);
};


module.exports = {getAll: ctrlWrapper(getAll)};