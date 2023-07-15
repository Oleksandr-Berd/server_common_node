const { User } = require("../../models")
const { ctrlWrapper, HttpError } = require("./../../utils/index");

const register = async (req, res) => {
    
    const newUser = await User.create(req.body)

    res.status(201).json({
        code: 201,
        email: newUser.email,
        name: newUser.name,
    })
}

module.exports = {
    register: ctrlWrapper(register)
}