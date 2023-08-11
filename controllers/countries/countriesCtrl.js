const { Countries } = require("../../models/index")

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

const allCountries = await Countries.find({}, "");
    
  const totalPages = Math.ceil(allCountries.length / limit); 
    
    const result = await Countries.find({}, "", { skip, limit });
    
  res.status(200).json({result, totalPages});
};

const countryDetails = async (req, res) => {
const {id} = req.params

    const result = await Countries.findById({ _id: id }, "")

const neighbors = await Countries.find({alpha3Code: result.borders.map(el => el)})

    res.status(200).json({ result, neighbors: neighbors.map(({name}) => name)});
}


module.exports = {
  getAll: ctrlWrapper(getAll),
  countryDetails: ctrlWrapper(countryDetails),
};