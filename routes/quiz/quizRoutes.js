const express = require("express")

const ctrlQuiz = require("../../controllers/quiz/quiz")

const quizRouter = express.Router()

quizRouter.get("/all", ctrlQuiz.getAll)
quizRouter.get("/:id", ctrlQuiz.getOneById);


module.exports = quizRouter;