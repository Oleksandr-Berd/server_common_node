const express = require("express")

const ctrlQuiz = require("../../controllers/quiz/quiz")
const {uploadCloud} = require("../../middleware/index") 

const quizRouter = express.Router()

quizRouter.get("/all", ctrlQuiz.getAll)
quizRouter.get("/:id", ctrlQuiz.getOneById);

quizRouter.patch("/icon", uploadCloud.single("icon"), ctrlQuiz.updateIcon);

module.exports = quizRouter;