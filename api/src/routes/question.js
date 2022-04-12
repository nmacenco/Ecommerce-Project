const express = require("express");
const {
  createQuestion,
  updateQuestion,
  getQuestions,
  getSingleQuestion,
  deleteQuestion,
} = require("../controllers/question.js");

//Creating routes and adding the controllers.

const questionsRouter = express.Router();

questionsRouter.get("/questions", getQuestions);
questionsRouter.get("/questions/:id", getSingleQuestion);

questionsRouter.post("/questions", createQuestion);
questionsRouter.put("/questions", updateQuestion);
questionsRouter.delete("/questions/:id", deleteQuestion);

module.exports = questionsRouter;
