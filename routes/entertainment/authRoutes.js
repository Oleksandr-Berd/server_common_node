const express = require("express")

const { validateBody, authenticate, uploadCloud } = require("../../middleware")
const { schemas } = require("../../models/entertainment/users")
const ctrl = require("../../controllers/entertainment/auth")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.patch("/bookmarked", authenticate, ctrl.addBookmarked)

router.get("/current", authenticate, ctrl.getCurrent)

router.post("/logout", authenticate, ctrl.logout)

router.patch("/avatars", authenticate, uploadCloud.single("avatar"), ctrl.updateAvatar)

router.patch(
  "/update",
  ctrl.updateUser
);



module.exports = router