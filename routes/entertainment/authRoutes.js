const express = require("express")

const { validateBody } = require("../../middleware")
const {schemas} = require("../../models/entertainment/users")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema));

module.exports = router