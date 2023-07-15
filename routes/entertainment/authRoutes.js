const express = require("express")

const { validateBody } = require("../../middleware")
const { schemas } = require("../../models/entertainment/users")
const ctrl = require("../../controllers/entertainment/auth")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);


module.exports = router