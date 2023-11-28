const { model, Schema } = require("mongoose");

const schemaQuiz = Schema({
    quizzes: Array,
})

const QuizCollection = model("quiz", schemaQuiz)

module.exports = {QuizCollection}