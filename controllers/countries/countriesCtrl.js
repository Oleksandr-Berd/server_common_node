const { Countries } = require("../../models/index")

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const { page = 1, limit = 8, searchQuery, region } = req.query;
  const skip = (page - 1) * limit;

const filterRegion = region === "all" ? null : region
    
  const allCountries =
    searchQuery && !filterRegion
      ? await Countries.find({ name: new RegExp(searchQuery, "i") }, "")
      : filterRegion && !searchQuery
      ? await Countries.find({ region: filterRegion }, "")
      : filterRegion && searchQuery
      ? await Countries.find(
          { region: filterRegion, name: new RegExp(searchQuery, "i") },
          "",
          { skip, limit }
        )
      : await Countries.find({}, "");

  const result =
    searchQuery && !filterRegion
      ? await Countries.find({ name: new RegExp(searchQuery, "i") }, "", {
          skip,
          limit,
        })
      : filterRegion && !searchQuery
      ? await Countries.find({ region: filterRegion }, "", { skip, limit })
      : filterRegion && searchQuery
      ? await Countries.find(
          { region: filterRegion, name: new RegExp(searchQuery, "i") },
          "",
          { skip, limit }
        )
      : await Countries.find({}, "", { skip, limit });

    
  const totalPages =
     Math.ceil(allCountries.length / limit);
    
  res.status(200).json({ result, totalPages });
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