const { Movies } = require("../../models/index")

const {ctrlWrapper} = require("./../../utils/index")

    
  const getAll = async (req, res) => {
        
      const result = await Movies.find({});
      
      console.log("test".red, result);
    res.status(200).json(result);
}

module.exports = { getAll: ctrlWrapper(getAll) };