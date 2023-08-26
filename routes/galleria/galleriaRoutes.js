const express = require("express")

const ctrlGalleria = require("../../controllers/galleria/galleriaCtrl");
const { uploadCloud } = require("../../middleware/index");

const galleriaRouter = express.Router()

galleriaRouter.get("/all", ctrlGalleria.getAll)
galleriaRouter.get("/:id", ctrlGalleria.getOneById);
galleriaRouter.patch(
  "/:id/image",
  uploadCloud.single("image"),
  ctrlGalleria.addImage
);

module.exports = galleriaRouter;



